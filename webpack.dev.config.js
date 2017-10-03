/*
    ./webpack.config.js
*/
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '!!raw-loader!./server/src/views/index.ejs',
  filename: 'index.html',
  inject: 'body',
});
const root = process.cwd();

module.exports = {
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve('./client'), path.resolve('./node_modules'), path.resolve(root, 'client/node_modules')],
  },
  entry: {
    app: [
      // 'babel-polyfill',
      'react-hot-loader/patch',
      // 'webpack-hot-middleware/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './client/renderers/hmr.js',
    ]
  },
  output: {
    path: path.join(__dirname, 'build/dist'),
    filename: '[name].js',
    publicPath: '/dist',
  },
  devServer: {
    publicPath: '/',
    port: 8080,
    host: 'localhost',
    hot: true,
    inline: true,
    proxy: {
      '**': 'http://localhost:3000',
    },
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
    {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true, // default is false
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[name]--[local]--[hash:base64:8]',
          },
        },
        'postcss-loader',
      ],
    },
    ],
  },
  plugins: [
    // HtmlWebpackPluginConfig,
    new CleanWebpackPlugin(['build/dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
};
