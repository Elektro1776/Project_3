require('dotenv').config();

import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import express from 'express';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// SSR is handled in our client renderers
import { renderPage } from '../client/renderers/server';
import config from './config';
// import { isAuthenticated } from './src/middleware/isAuthenticated';
// import signupRouter from './src/api/routes/signup';
// import loginRouter from './src/api/routes/login';
import User from './src/schema/User';
import { Strategy as LocalStrategy } from 'passport-local';

const MongoStore = require('connect-mongo')(session);

const app = express();

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

// drop in bluebird as our mongoose promise library;
mongoose.Promise = require('bluebird');

const options = {
  useMongoClient: true,
};
if (DEV) {
  mongoose.createConnection(process.env.MONGO_LOCAL_URI, options)
    .then((success) => {
      console.info('Success connect to mongo!');
    })
    .catch((err) => {
      console.info('Could not complete connection', err);
    });
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build/dist')));
app.use(session({
  secret: 'foo',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.MONGO_LOCAL_URI, autoRemove: 'native' }),
}));
// require('./src/auth/localAuth')(app);

app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
// var User = require('./models/account');
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/test', (req, res) => {
  res.send({ Hello: 'uTile is Served' });
});
/**
NOTE: We have to place all middleware that will handle all api requests above our get('*')
There is probably a better way to do this but for now this will do
*/
if (PROD) {
  app.get('*', async (req, res) => {
    const initalContent = renderPage(req);
    // console.log(' WHAT IS OUR INITAL CONTENT?', initalContent);
    res.render('index', { initalContent });
  });
}
app.post('/signup', (req, res) => {
  try {
    // console.log(' WE HIT THISSS???', User.register);
    // User.register(new User({ username: 'fuck this', email: 'fuckoff@fuck.com' }), 'fuccckkkkkk', (err, account) => {
      // console.log(' WTHHHHHHHEHEHEELLLL', err, account);
      const test = User.register;
      const mock = {}
      mock.fuck = test;
      console.log(' WHAT IS OUR TEST???', test);
      res.send(JSON.stringify(mock))
    // });
  } catch (e) {
    console.log(' WHAT IS OUR ERRR', e);
  } finally {

  }

});

app.get('*', (req, res) => {
  // console.log(' CATCH ALL ROUTE HIT!', Object.keys(req));
  // return renderPage(req, res);
  res.render('index', { initalContent: renderPage(req, res) });
});
// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
