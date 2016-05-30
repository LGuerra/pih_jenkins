var webpack           = require('webpack');
var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var webpackConf       = require('./webpack.config.production');

webpackConf.plugins = [
  function()
  {
    this.plugin("done", function(stats) {
      if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1)
        {
          stats.compilation.errors.map(function(error, index) {
            console.log(error.message);
          });
          process.exit(1); // or throw new Error('webpack build failed.');
        }
    });
  },
  new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js'),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"staging"'
  }),
  new extractTextPlugin('main.min.css')
];

webpackConf.output = {
  path: path.resolve('./client/dist/staging/'),
  publicPath: 'https://s3-us-west-2.amazonaws.com/assets-pih-banca/staging/',
  filename: '[name].min.js'
}

module.exports = webpackConf;
