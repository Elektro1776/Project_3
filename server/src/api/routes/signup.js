import express from 'express';

const router = express.Router();
import Account from '../../schema/User';
import passport from 'passport';

router.post('/', (req, res, next) => {
  console.log(' WHAT IS THE REQ BODY USERNAME ?', req.body);
  Account.register(new Account({  username: req.body.username }), req.body.password, (err, account) => {
    if (err) {
      console.log(' WHAT IS THE ERRR???', err);
      return res.send(err);
    }
    // console.log(' ANYTHING HITTING HER?', err, 'account', account);
    passport.authenticate('local', function(err, user, info) {
      console.log(' DOES THIS WORK????', err, 'USER,', user, 'INFOO', info);
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });
});

export default router;
