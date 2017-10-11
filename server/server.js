require('dotenv').config();

import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import config from './config';
import { renderPage } from '../client/renderers/server';
// import jsonwebtoken from 'jsonwebtoken';
import jwt from 'express-jwt';
import signupRouter from './src/api/routes/signup';
import bodyParser from 'body-parser';

const app = express();

// const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';
mongoose.Promise = require('bluebird');

// const options = {
//   useMongoClient: true,
//   promiseLibrary: require('bluebird'),
// };
if (DEV) {
  mongoose.connect(process.env.MONGO_LOCAL_URI);
  // .then((success) => {
  //   console.info('Success connect to mongo!');
  //   connection = success;
  // })
  // .catch((err) => {
  //   console.info('Could not complete connection', err);
  // });
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, '../build/dist')));
// app.use();
app.use(bodyParser.json());
// middleware that checks if JWT token exists and verifies it if it does exist.
// In all the future routes, this helps to know if the request is authenticated or not.
app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  let token = req.headers.authorization;
  if (!token) return next();
  token = token.replace('Bearer ', '');


  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please register Log in using a valid email to submit posts',
      });
    }
    req.user = user;
    next();
  });
});
app.use('/signup', signupRouter);
app.use('/test', (req, res) => {
  res.send({ Hello: 'uTile is Served' });
});
// /**
// NOTE: We have to place all middleware that will handle all api requests above our get('*')
// There is probably a better way to do this but for now this will do
// */
// if (PROD) {
//   app.get('/', async (req, res) => {
//     const initalContent = renderPage(req);
//     // console.log(' WHAT IS OUR INITAL CONTENT?', initalContent);
//     res.render('index', { initalContent });
//   });
// }

app.get('*', jwt({ secret: process.env.JWT_SECRET, credentialsRequired: false }), (req, res) => {
  // if (!req.user && req.url === '/') {
  //   console.log(' ');
  //   return res.redirect(301, 'http://localhost:8080/signup');
  // }
  // console.log(' WHAT IS OUR REQ URL ????', req.user);
  res.render('index', { initalContent: renderPage(req, res) });
});

// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
