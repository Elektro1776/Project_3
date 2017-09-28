
// import React from 'react';
// import ReactDomServer from 'react-dom/server';
// import serverRender from '../client/renderers/server';
import express from 'express';
import path from 'path';
import config from './config';
// import App from '../client/components/App';
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import WebpackDevServer from 'webpack-dev-server';
// import wpConfig from '../webpack.dev.config';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, '../build/dist')));
// const initalContent = serverRender();
// console.log(' WHAT IS THE initalContent?', initalContent);
app.get('/', async (req, res) => {
  res.render('index');
});
app.get('/test', (req, res) => {
  res.json({ Hello: 'uTile FOR THE WIN' });
});
app.get('/fuckAll', (req, res) => {
  res.json({ Fuck: 'Hellyea Bitchessss' });
});
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/dist/index.html'));
// });
// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!!!!!!!!! !\n');
});
