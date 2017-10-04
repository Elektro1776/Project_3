require('dotenv').config();

import csshook from 'css-modules-require-hook/preset'; // import hook before routes

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import { renderPage } from '../client/renderers/server';
import config from './config';

const app = express();
const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, '../build/dist')));
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
