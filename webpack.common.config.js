const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const template = require("ejs!./server/src/views/index.ejs");

// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//   template: './server/src/views/index.ejs',
//   filename: 'index.html',
//   inject: 'body',
// });
module.exports = {
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      // 'prop-types',
      // 'axios',
      // 'lodash.debounce',
      // 'lodash.pickby',
    ],
  },
  plugins: [
    // HtmlWebpackPluginConfig,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, '/server/src/public'),
  // },
  module: {
    loaders: [
      { test: /\.ejs$/, loader: 'ejs-loader' },
    ],
    ejsLoader: {
      variable: 'data',
      interpolate: /\{\{(.+?)\}\}/g,
      evaluate: /\[\[(.+?)\]\]/g,
    },
  },
};
