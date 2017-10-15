/*
    ./webpack.config.js
*/
const webpack = require('webpack');
// const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MonacoEditorSrc = path.join(__dirname,'node_modules/monaco-editor/min/vs');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '!!raw-loader!./server/src/views/index.ejs',
  filename: 'index.html',
  inject: 'body',
});
const root = process.cwd();

module.exports = {
  // devtool: 'source-map',
  // target: 'web',
  context: path.resolve(__dirname),
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    // alias: {
    //   'react-monaco-editor': MonacoEditorSrc,
    // },
    modules: [path.resolve('./client'), path.resolve('./node_modules'), path.resolve(__dirname, 'client/node_modules')],
  },
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-router',
      'redux',
      'redux-thunk',
      'react-monaco-editor',
    ],
    app: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      './client/renderers/hmr.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].js',
    publicPath: '/dist',
  },
  devServer: {
    publicPath: '/dist',
    port: 8080,
    host: 'localhost',
    hot: true,
    inline: true,
    proxy: {
      '**': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
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
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /(\.css|\.scss)$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              query: {
                localIdentName: '[hash:8]',
                modules: true,
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    // HtmlWebpackPluginConfig,
    // new CleanWebpackPlugin(['public/dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      publicPath: '/public',
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new CopyWebpackPlugin([
      {
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs',
      },
    ]),
  ],
};
