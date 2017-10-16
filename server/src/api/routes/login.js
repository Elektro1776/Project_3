import express from 'express';

// import passwordHelper from '../../util/password_validation';
import User from '../../schema/User';

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, { password: true, email: true })
    .then((user) => {
      if (user) {
        console.info(' DO WE HAVE A USER ??', user);
        return res.status(200).json({ success: true, user });
      }
      console.warn(' NO USER FOUND!!!', user);
      res.status(401).json({ success: false, message: 'No user found for that email' });
    })
    .catch((err) => {
      console.error(' ERROR LOGGING IN USER', err);
      res.status(401).json({ success: false, message: err.message });
    });
  // res.sendStatus(200);
  // passwordHelper.authenticate();
});

export default loginRouter;
