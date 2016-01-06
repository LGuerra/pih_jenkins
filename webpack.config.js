var path = require('path');
var webpack = require('webpack');

var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './client/scripts/main.js',
    vendor: ['jquery', 'bootstrap']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    new extractTextPlugin('styles.css')
  ],
  output: {
    path: path.resolve('./app/assets/javascripts/build/'),
    filename: '[name].js'
  },
  watch: 'true',
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
          presets: 'es2015',
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractTextPlugin.extract('style-loader','css-loader!autoprefixer-loader!sass-loader')
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader'
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
  resolve: {
    extensions: ['', '.js', '.es6']
  }
};
