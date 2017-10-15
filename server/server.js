// Lets grab our ENVIRONMENT VARS
require('dotenv').config();

// This jazz here if so we can use all the fancy sass on server side renders... this was a pain
import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import jsonwebtoken from 'jsonwebtoken';
import jwt from 'express-jwt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import config from './config';

import { renderPage } from '../client/renderers/server';
// CUSTOM ROUTERS
import authRouter from './src/auth/localAuth';
import signupRouter from './src/api/routes/signup';
// CUSTOM MIDDLEWARE
import { isAuthenticated } from './src/middleware/isAuthenticated';

const app = express();

// const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
mongoose.Promise = require('bluebird');

const options = {
  useMongoClient: true,
  promiseLibrary: require('bluebird'),
};
if (DEV) {
  mongoose.connect(process.env.MONGO_LOCAL_URI, options);
}


app.use(express.static(path.join(__dirname, '../public')));
// app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
// app.use();
app.use(cookieParser());
app.use(bodyParser.json());
// Runs our check on the tokens sent from client on every request
app.use(isAuthenticated);
app.use('/auth', authRouter);
app.use('/signup', signupRouter);
app.use('/test', (req, res) => {
  res.send({ Hello: 'uTile is Served' });
});

app.get('*', jwt({ secret: process.env.JWT_SECRET, credentialsRequired: false }), (req, res) => {
  const { initalContent } = renderPage(req, res);
  res.render('index', { initalContent });
});

// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
