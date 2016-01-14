var path = require('path');
var webpack = require('webpack');

var node_modules = path.resolve(__dirname, 'node_modules');
var client = path.resolve(__dirname, 'client');
var bootstrap = path.resolve(__dirname, 'node_modules/bootstrap/dist/css');

var modulePaths = [node_modules, client, bootstrap];

// Add gzip
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './client/scripts/main.js'),
    vendor: ['jquery', 'bootstrap']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new extractTextPlugin('../../stylesheets/build/main.css')
  ],
  output: {
    path: path.resolve('./app/assets/javascripts/build/'),
    filename: '[name].js'
  },
  watch: 'true',
  // modulesDirectories: modulePaths,
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
  resolve: {
    extensions: ['', '.js', '.es6']
  }
};
