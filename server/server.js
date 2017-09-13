const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('../webpack.dev.config.js');
const homeRouter = require('./src/routes/home');
const app = express();
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));
app.get('/', homeRouter);
// Serve the files on port 3000.
app.listen(3000, () => {
    console.info('Example app listening on port 3000!\n');
});
