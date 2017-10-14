import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
// import jwt from 'express-jwt';
import User from '../../schema/User';

const signupRouter = express.Router();

signupRouter.post('/', (req, res) => {
  // TODO: **** Need to encrypt the user password here probably *****
  const { username, email, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        const newUser = new User({ username, email });
        newUser.save()
          .then((success) => {
            const access_token = jsonwebtoken.sign({
              username,
              iss: 'uTileDevs',
              role: 'checker',
            }, process.env.JWT_SECRET, {
              expiresIn: '7d',
            });
            const token = jsonwebtoken.sign({
              username,
              iss: 'uTileDevs',
              role: 'normal', // default is normal
            }, process.env.JWT_SECRET, { // get secret from config
              expiresIn: '1m', // expires in 1 day
            });
            console.info(' WE GOT A TOKEN!', token);
            res.json({
              username,
              email,
              token,
              access_token,
            });
          })
          .catch((err) => {
            console.info('ERR saving user', err);
          });
      }
    });
});

export default signupRouter;
