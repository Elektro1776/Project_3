import express from 'express';

const router = express.Router();
import User from '../../schema/User';

router.post('/', (req, res, next) => {
  const { user_name, email } = req.body;
  console.info(' WE GOT HIT WITH A POST???', user_name, email);
  User.register({ username: 'fuck this' }, 'fuccckkkkkk', (err, account) => {
    console.log(' WTHHHHHHHEHEHEELLLL', err, account);
  });
  // console.log('USER . register', Uer);
});

export default router;
