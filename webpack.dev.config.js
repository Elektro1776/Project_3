/*
    ./webpack.config.js
*/
// const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config.js');


module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  entry: './client/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
  },
});
