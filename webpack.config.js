var webpack = require('webpack');
var path = require('path');

var plugins = []

if (process.env['PRODUCTION']) plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}))

module.exports = {
  devtool: 'source-map',
  cache: true,
  entry: "./build/index.js",
  stats: {children: false},
  externals: ['domic'],
  output: {
    path: "./",
    publicPath: "/",
    library: '',
    target: 'commonjs',
    filename: "index.js",
    sourceMapFilename: "[file].map"
  },
  resolveLoader: { root: path.join(__dirname, "node_modules") },
  resolve: {extensions: ["", ".webpack.js", ".web.js", ".js"]},
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
}
