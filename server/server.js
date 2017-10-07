require('dotenv').config();

import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import express from 'express';
import session from 'express-session';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';

import { renderPage } from '../client/renderers/server';
import config from './config';
import { isAuthenticated } from './src/middleware/isAuthenticated';

const MongoStore = require('connect-mongo')(session);

const app = express();

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
mongoose.Promise = require('bluebird');

let connection;
const options = {
  useMongoClient: true,
  promiseLibrary: require('bluebird'),
};
if (DEV) {
  console.log('DEV IS RUNNING');
  mongoose.createConnection(process.env.MONGO_LOCAL_URI, options)
    .then((success) => {
      console.info('Success connect to mongo!');
      connection = success;
    })
    .catch((err) => {
      console.info('Could not complete connection', err);
    });
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, '../build/dist')));
app.use(session({
  secret: 'foo',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ url: process.env.MONGO_LOCAL_URI, autoRemove: 'native' }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/test', (req, res) => {
  res.send({ Hello: 'uTile is Served' });
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
app.get('*', (req, res) => {
  console.log(' CATCH ALL ROUTE HIT!');
  // return renderPage(req, res);
  res.render('index', { initalContent: renderPage(req, res) });
});
// app.get('/about', (req, res) => {
//   console.log(' CATCH ALL ROUTE HIT!');
//   res.render('index', { initalContent: 'Loading' });
// });
// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
