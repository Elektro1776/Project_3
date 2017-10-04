import { Strategy as LocalStrategy } from 'passport-local';
import User from '../schema/User';

module.exports = (passport) => {
  passport.use(new LocalStrategy(User.createStrategy()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
