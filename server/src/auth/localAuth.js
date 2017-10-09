import { Strategy as LocalStrategy } from 'passport-local';
import User from '../schema/User';

// module.exports = (passport) => {
//   console.log('IS THIS LOADING PASSPORT ?');
//   passport.use(new LocalStrategy(User.authenticate()));
//   passport.serializeUser(User.serializeUser());
//   passport.deserializeUser(User.deserializeUser());
// };
