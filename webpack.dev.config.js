/*
    ./webpack.config.js
*/
const webpack = require('webpack');
// const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '!!raw-loader!./server/src/views/index.ejs',
  filename: 'index.html',
  inject: 'body',
});
const root = process.cwd();

module.exports = {
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve('./client'), path.resolve('./node_modules'), path.resolve(__dirname, 'client/node_modules')],
  },
  entry: {
    app: [
      // 'babel-polyfill',
      'react-hot-loader/patch',
      // 'webpack-hot-middleware/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './client/renderers/hmr.js',
    ],
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
            // {
            //   loader: 'postcss-loader',
            // },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
       test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
       loader: 'url-loader'
     }
    //   {
    //   test: /(\.css|\.scss)$/,
    //   include: /(\node_modules\/react-toolbox)/,
    //   loader: ExtractTextPlugin.extract(
    //     ['style-loader',
    //     { loader: 'css-loader',
    //     options: { importLoaders: 1,
    //       modules: true
    //     }
    //   },
    //   'sass-loader',
    //   ],
    //     'css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass!toolbox')
    // },
    // {
    //   test: /(\.css|\.scss)$/,
    //   exclude: /(\node_modules\/react-toolbox)/,
    //   loader: ExtractTextPlugin.extract('style-loader', 'css?!postcss!sass')
    // },
      // {
      //   test: /(\.css|\.scss)$/,
      //   use: [
      //     {
      //       loader: 'style-loader', // creates style nodes from JS strings
      //     },
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         importLoaders: 1,
      //         modules: true,
      //       },
      //     },
      //     {
      //       loader: 'sass-loader', // compiles Sass to CSS
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    // HtmlWebpackPluginConfig,
    new CleanWebpackPlugin(['build/dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ],
};
