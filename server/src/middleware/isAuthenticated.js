import jsonwebtoken from 'jsonwebtoken';
let count = 0;

export const isAuthenticated = (req, res, next) => {
  console.log(' WHAT IS OUR REQ URL AS WE GO', req.session );
  count += 1;
  // check header or url parameters or post parameters for token
  let token = req.headers.authorization;
  const { access_token } = req.query;
  // if neither exists just call next
  if (!token && !access_token) return next();
  // This gets rid of the Bearer portion from the header as well as the extra space
  token = token.replace('Bearer ', '');
  // create our tokens object to pass around our verification process;
  const tokens = {
    token,
    access_token,
  };

  verifyToken(tokens, (err, user, isReauth) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: err.message,
      });
    }
    if (isReauth) {
      const decodeUser = jsonwebtoken.decode(user.token);
      req.user = decodeUser;
      res.locals.token = user.token;
      res.locals.access_token = user.access_token;
      res.locals.isReauth = true;
    } else {
      req.user = user;
      res.locals.token = tokens.token;
      res.locals.access_token = tokens.access_token;
    }
    // console.log(' We should have a user!', req.user, res.locals);
    next();
  });
};
const verifyToken = ({ token, access_token }, cb) => {
  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          verifyAccessToken(access_token, (error, reauth_tokens) => {
            if (error) {
              return cb(err, null);
            }
            return cb(null, reauth_tokens, true);
          });
          break;
        case 'JsonWebTokenError':
          return cb(err, null);
        default:
          return;
      }
      return;
    }
    return cb(null, user, false);
  });
};
const verifyAccessToken = (access_token, cb) => {
  jsonwebtoken.verify(access_token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return cb(err, null);
    }
    const newTokens = createTokens(user.username);
    return cb(null, newTokens);
  });
};

const createTokens = (username) => {
  const access_token = jsonwebtoken.sign({
    username,
    iss: 'uTileDevs',
    role: 'checker',
  }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  const token = jsonwebtoken.sign({
    username,
    role: 'normal', // default is normal
  }, process.env.JWT_SECRET, { // get secret from config
    expiresIn: '24h', // expires in 1 day
  });
  return { token, access_token };
};
