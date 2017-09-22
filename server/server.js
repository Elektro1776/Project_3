
import express from 'express';
// import webpack from 'webpack';
import path from 'path';
// import webpackDevMiddleware from 'webpack-dev-middleware';

import config from './config';

// const serverRender = require('../client/renderers/server.js');

// const wpConfig = require('../webpack.dev.config.js');
// const homeRouter = require('./src/routes/home');

const app = express();
// const compiler = webpack(wpConfig);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'src/public')));
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
// }));
app.get('/', async (req, res) => {
  res.render('index', { answer: 42 });
});
// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!\n');
});
