/*
    ./webpack.config.js
*/
// const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config.js');


module.exports = merge(common, {
  devtool: 'inline-source-map',
  entry: [
    'babel-polyfill', './client/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'server/src/public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-2']
        }
      }
    }]
  }
});
