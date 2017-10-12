import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
// import jwt from 'express-jwt';
import User from '../../schema/User';

const router = express.Router();

router.post('/', (req, res) => {
  // TODO: **** Need to encrypt the user password here probably *****
console.log(' HELLLOOOO WORLD!!!!!!');
  const { username, email, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      console.log(' NO user!!!!!', user);
      if (!user) {
        const newUser = new User({ username, email });
        newUser.save()
          .then((success) => {
            console.info(' SAVED THE USER!', newUser);
            const token = jsonwebtoken.sign({
              username,
              role: 'normal', // default is normal
            }, process.env.JWT_SECRET, { // get secret from config
              expiresIn: '1d', // expires in 1 day
            });
            console.info(' WE GOT A TOKEN!', token);
            res.json({
              username,
              email,
              token,
            });
          })
          .catch((err) => {
            console.info('ERR saving user', err);
          });
      }
    });
});

export default router;
