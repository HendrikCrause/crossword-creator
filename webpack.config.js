var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path')

const PATHS = {
  app: path.join(__dirname, 'build'),
  style: path.join(__dirname, 'app', 'styles.css'),
  font: path.join(__dirname, 'build', 'fonts')
}

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/main.js",
  output: {
    path: __dirname + "/build",
    filename: "main.min.js",
    publicPath: "/build"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ["add-module-exports", "react-html-attrs",
          "transform-class-properties", "transform-decorators-legacy"]
        }
      },
      {
        test: /\.ttf$|\.eot$|\.woff$/,
        loader: 'file',
        query: {
          name: './fonts/[name].[ext]',
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      }
    ]
  },
  plugins: debug ? [
        new ExtractTextPlugin("[name].css"),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin("[name].css"),
  ],
}
