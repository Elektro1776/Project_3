require('dotenv').config();

import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import express from 'express';
import session from 'express-session';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import bodyParser from 'body-parser';
import { renderPage } from '../client/renderers/server';
import config from './config';
import signupRouter from './src/api/routes/signup';
const MongoStore = require('connect-mongo')(session);

const app = express();

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
mongoose.Promise = require('bluebird');

let connection;
const options = {
  useMongoClient: true,
  // promiseLibrary: require('bluebird'),
};
if (DEV) {
  console.log('DEV IS RUNNING');
  // mongoose.createConnection(process.env.MONGO_LOCAL_URI)
  //   .then((success) => {
  //     console.info('Success connect to mongo!');
  //     connection = success;
  //   })
  //   .catch((err) => {
  //     console.info('Could not complete connection', err);
  //   });
  mongoose.connect('mongodb://localhost/uTile', (error) => {
  // Check error in initial connection. There is no 2nd param to the callback.
    console.info(' ANY ERROR ????', error);
  });
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(bodyParser.json());
app.use(session({
  secret: 'foo',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ url: process.env.MONGO_LOCAL_URI }),
}));
app.use(express.static(path.join(__dirname, '../build/dist')));
// passport config
app.use(passport.initialize());
app.use(passport.session());

// app.use('/signup', signupRouter);
app.post('/signup', (req, res, next) => {
  console.log(' WHAT IS THE REQ BODY USERNAME ?', req.body);
  Account.register(new Account({  username: req.body.username }), req.body.password, (err, account) => {
    if (err) {
      console.log(' WHAT IS THE ERRR???', err);
      return res.send(err);
    }
    // console.log(' ANYTHING HITTING HER?', err, 'account', account);
    passport.authenticate('local', function(err, user, info) {
      // console.log(' DOES THIS WORK????', err, 'USER,', user, 'INFOO', info);
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
      req.logIn(user, function(err) {
        console.log(' WE SHOULD LOG THE USER IN ???', err);
        if (err) { return next(err); }
        console.log(' WE SHOULD REDIRECT!!!', user.username);
        return res.json(user);
      });
    })(req, res, next);
  });
});
const Account = require('./src/schema/User');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/test', (req, res) => {
  res.send({ Hello: 'uTile is Served' });
});
app.get('*', (req, res) => {
  // console.log(' CATCH ALL ROUTE HIT!', Object.keys(req));
  // return renderPage(req, res);
  res.render('index', { initalContent: renderPage(req, res) });
});
/**
NOTE: We have to place all middleware that will handle all api requests above our get('*')
There is probably a better way to do this but for now this will do
*/
if (PROD) {
  app.get('/', async (req, res) => {
    const initalContent = renderPage(req);
    // console.log(' WHAT IS OUR INITAL CONTENT?', initalContent);
    res.render('index', { initalContent });
  });
}

// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
