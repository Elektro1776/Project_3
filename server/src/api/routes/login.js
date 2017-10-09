import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/', passport.authenticate('local'), (req, res) => {
  console.log(' WHAT IS HAPPEING HERE??', Object.values(req));
  res.send(200);
})


export default router;
