var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './build/app/app.js',
  output: {path: __dirname, filename: 'script.min.js'},
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.html$/, loader: 'raw'},
      // {test: /\.styl$/, loader: ExtractTextPlugin.extract("style", "css!stylus", { publicPath: './' })},
      {
        test: /.js?$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    // new ExtractTextPlugin('bundel.css')
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};