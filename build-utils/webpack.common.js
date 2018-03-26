const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {basename} = require('path');
const projectPath = require('./paths');

module.exports = {
  context: projectPath.src,
  entry: {
    app: './app.js'
  },
  output: {
    filename: 'script.js',
    path: projectPath.dist
  },
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.jsx?$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash].[ext]'
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin([basename(projectPath.dist)], {root: projectPath.root}),
  ]
};
