/*
    ./webpack.config.js
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const template = require("ejs!./server/src/views/index.ejs");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '!!raw-loader!./server/src/views/index.ejs',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve('./client'), path.resolve('./node_modules')],
  },
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
    app: [
      // 'babel-polyfill',
      // 'react-hot-loader/patch',
      // 'webpack-hot-middleware/client?http://localhost:8080',
      // 'webpack/hot/only-dev-server',
      './client/index.js',
    ]
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
    HtmlWebpackPluginConfig,
    new CleanWebpackPlugin(['build/public']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
};
