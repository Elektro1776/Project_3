const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  resolve: {
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
    ],
    app: ['./client/renderers/hmr.js'],
  },
  output: {
    path: path.join(__dirname, 'build/dist'),
    filename: '[name].js',
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
      sourcemap: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
