/*
    ./webpack.config.js
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.config.js');


module.exports = merge(common, {
  devtool: 'eval',
  entry: [
    'babel-polyfill/dist/polyfill.js',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client/index.js',
  ],
  output: {
    path: path.join(__dirname, 'build/public'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/public',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', ['env', { targets: { node: true } }], 'stage-2'],
        },
      },
    }],
  },
  plugins: [
    // webpack.optimize.OccurenceOrderPlugin(),
    // new CleanWebpackPlugin(['build/public']),
    new webpack.HotModuleReplacementPlugin(),

  ],
});
