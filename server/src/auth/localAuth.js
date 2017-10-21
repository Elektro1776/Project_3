import express from 'express';

const authRouter = express.Router();

import User from '../schema/User';


authRouter.get('/auth/token', (req, res, next) => {
  if (req.user) {
    const currentUser = req.user;
    if (req.session.github_token) {
      currentUser.github_token = req.session.github_token.access_token;
      currentUser.git_profile = req.session.git_profile;
      const { login, id } = req.session.git_profile;
      User.where({ username: req.user.username })
      .update({ git_profile: { login, id } }, (err, doc) => {
        // console.log(' CAN WE GET A NEW DOC????', doc);
        // console.log(' WHAT ABOUT AN ERRR', err);
      })
    }
    currentUser.token = res.locals.token;
    currentUser.access_token = res.locals.access_token;
    // console.log(' WHAT IS OUR USER HERE??', currentUser);
    res.json(currentUser);
    // if (req.url)
  }
});

export default authRouter;
