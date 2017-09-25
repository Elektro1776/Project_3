const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './server/src/views/index.ejs',
  filename: 'index.html',
  inject: 'body',
});
module.exports = {
  // entry: {
  //   app: './client/index.jsx',
  // },
  plugins: [
    HtmlWebpackPluginConfig,
  ],
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, '/server/src/public'),
  // },
  // module: {
  //   loaders: [
  //     { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
  //     { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
  //   ],
  // },
};
