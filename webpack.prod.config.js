
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.config.js');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['babel-polyfill', './client/renderers/hmr.js'],
  },
  output: {
    path: path.join(__dirname, 'build/dist'),
    filename: '[name].js',
    publicPath: '/dist',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-2'],
        },
      },
    },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
