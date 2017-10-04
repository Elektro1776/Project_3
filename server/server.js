require('dotenv').config();

import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import express from 'express';
import session from 'express-session';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';

import { renderPage } from '../client/renderers/server';
import config from './config';

const MongoStore = require('connect-mongo')(session);

const app = express();

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
let mongoConnection;
const options = {
  server: {
    reconnectTries: Number.MAX_VALUE,
  },
  useMongoClient: true,
  promiseLibrary: require('bluebird'),
};
if (DEV) {
  mongoConnection = mongoose.connect(process.env.MONGO_LOCAL_URI, options)
    .then((success) => {
      console.info('Success connect to mongo!');
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
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
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
  res.render('index', { initalContent: 'Loading' });
});
// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
