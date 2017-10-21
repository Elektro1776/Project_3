// Lets grab our ENVIRONMENT VARS
require('dotenv').config();

// This jazz here if so we can use all the fancy sass on server side renders... this was a pain
import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import knex from 'knex';
import session from 'express-session';

import config from './config';

import { renderPage } from '../client/renderers/server';
// CUSTOM ROUTERS
import authRouter from './src/auth/localAuth';
import signupRouter from './src/api/routes/signup';
import loginRouter from './src/api/routes/login';
import githubRouter from './src/api/github';
import githubAuthRouter from './src/auth/githubAuth';

// CUSTOM MIDDLEWARE
import { isAuthenticated } from './src/middleware/isAuthenticated';

const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
// const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
mongoose.Promise = require('bluebird');

const options = {
  useMongoClient: true,
  promiseLibrary: require('bluebird'),
};
if (DEV) {
  mongoose.connect(process.env.MONGO_LOCAL_URI, options)
    .then((success) => {
      console.info('Success connect to mongo', process.env.MONGO_LOCAL_URI);
    })
    .catch((err) => {
      console.info('Error connecting to mongo', err);
    });
}


app.use(express.static(path.join(__dirname, '../public')));
// app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
// app.use();
app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
  // console.log(' WHAT IS HAPPEINGN IN HERE?????', req.headers);
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  next();
});
// Runs our check on the tokens sent from client on every request
app.use(githubAuthRouter);
app.use(isAuthenticated);
app.use(authRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/api/github', githubRouter);
app.use('/test', (req, res) => {
  res.send({ Hello: 'uTile is Served' });
});

app.get('*', jwt({ secret: process.env.JWT_SECRET, credentialsRequired: false }), (req, res) => {
  // console.log(' WHAT IS THE MAIN RENDER REQ LOCAL KEYS?', Object.keys(res.locals));
  const { initalContent, initalState } = renderPage(req, res);
  // console.log(' WHAT IS THE INITAL STATE???/', req.session);
  res.render('index', { initalContent, initalState });
});

// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
