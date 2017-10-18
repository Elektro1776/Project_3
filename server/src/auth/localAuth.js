import express from 'express';

const authRouter = express.Router();

// import User from '../schema/User';


authRouter.get('/token', (req, res, next) => {
  // console.info(' WE HAVE A USER  FROM AUTH ROUTERRRRRR!!!', req.user, res.locals);
  if (req.user) {
    const user = req.user;
    user.token = res.locals.token;
    user.access_token = res.locals.access_token;
    res.json(user);
  }
  // next();
});

export default authRouter;
