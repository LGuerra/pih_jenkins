var path = require('path');
var webpack = require('webpack');

var node_modules = path.resolve(__dirname, 'node_modules');
var client = path.resolve(__dirname, 'client');
var bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css');

var modulePaths = [node_modules, client, bootstrap];

// Add gzip
var extractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: 'mocha!./test/js/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: 'es2015'
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractTextPlugin.extract('style-loader','css-loader!autoprefixer-loader!sass-loader')
      },
      {
        test: /\.css$/,
        loader: extractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(png|jpg)$/,
        node_modules: /node_modules/,
        loader: 'url-loader?limit=1000'
      }
    ]
  },
  stats: {
    colors: true
  },
  target: 'web',
  debug: true,
  devtool: 'eval-source-map',
    resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.js', '.es6'],
    alias: {
      'api-banca': 'client/scripts/api/api-helper',
      'images-banca': 'client/images',
      'helpers-banca': 'client/scripts/helpers/index',
      'im-main-navigation': 'client/scripts/components/navigation/main/index',
      'im-secondary-navigation': 'client/scripts/components/navigation/secondary/index',
      'im-components': 'client/scripts/components',
      'im-common': 'client/scripts/components/common'
    }
  }
}
