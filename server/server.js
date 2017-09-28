
// import React from 'react';
// import ReactDomServer from 'react-dom/server';
import { renderPage } from '../client/renderers/server';
import express from 'express';
import path from 'path';
import config from './config';
const app = express();
const PROD = process.env.NODE_ENV === 'production';
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, '../build/dist')));
if (PROD) {
  app.get('/', async (req, res) => {

    const initalContent = renderPage(req);
    // console.log(' WHAT IS OUR INITAL CONTENT?', initalContent);
    res.render('index', { initalContent });
  });
}
app.get('/', (req, res) => {
  res.render('index', { initalContent: 'Loading' });
})
app.get('/test', (req, res) => {
  res.json({ Hello: 'uTile FOR THE WIN' });
});
app.get('/fuckAll', (req, res) => {
  res.json({ Fuck: 'Hellyea Bitchessss' });
});
// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
