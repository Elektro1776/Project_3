
import express from 'express';
import path from 'path';
import config from './config';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import wpConfig from '../webpack.dev.config';

const app = express();
if (process.env.NODE_ENV !== 'production') {
  console.log('WE ARE IN DEV!!!!');
  const middlewareOptions = {
    stats: { colors: true },
    noInfo: false,
    lazy: false,
    // hot: true,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost',
    },
    publicPath: wpConfig.output.publicPath
  }
  const compiler = webpack(wpConfig);
  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, middlewareOptions);
  app.use(webpackDevMiddlewareInstance)

  const webpackHotMiddleware = require('webpack-hot-middleware')
  app.use(webpackHotMiddleware(compiler))
}
// const serverRender = require('../client/renderers/server.js');

// const homeRouter = require('./src/routes/home');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
const it = `Hello's`;
console.info('it', it);
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: wpConfig.output.publicPath,
//   noInfo: false,
//   reload: true,
//   hot: true,
//   hearbeat: 4000,
// }));
// app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static(path.join(__dirname, '../build/public/')));
app.get('/', async (req, res) => {
  res.render('index', { answer: 42 });
});
// Serve the files on port 3000.
app.listen(config.port, () => {
  console.info('Example app listening on port 3000!\n');
});
