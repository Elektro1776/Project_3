import express from 'express';

const authRouter = express.Router();

// import User from '../schema/User';


authRouter.get('/token', (req, res, next) => {

  if (req.user) {
    const user = req.user;
    if (req.session.github_token) {
      console.info(' WE HAVE A USER  FROM AUTH ROUTERRRRRR!!!', req.session);
      user.github_token = req.session.github_token.access_token;
    }
    user.token = res.locals.token;
    user.access_token = res.locals.access_token;
    // console.log(' WHAT IS OUR USER HERE??', user, res.locals);
    res.json(user);
  }
});

export default authRouter;
