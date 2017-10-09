import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import session from 'express-session';

const MongoStore = require('connect-mongo')(session);

import User from '../schema/User';

// console.log('what is our User????', Object.keys(User), User.createStrategy);
module.exports = (app) => {
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use(session({
    secret: 'foo',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.MONGO_LOCAL_URI, autoRemove: 'native' }),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  console.log(' initialize passport !');
};
