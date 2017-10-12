import express from 'express';

const authRouter = express.Router();

import User from '../schema/User';


authRouter.get('/token', (req, res, next) => {
  console.info(' WE HAVE A USER  FROM AUTH ROUTERRRRRR!!!', req.user);
  if (req.user) {
    res.send(req.user);
    // next();
  }
});

export default authRouter;
