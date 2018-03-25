const path = require('path');
const projectPath = require('./paths');
const webpack = require('webpack');
//const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    stats: 'errors-only',
    compress: true
  },
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './app.js'
  ],
  output: {
    pathinfo: true,
    filename: 'script.js',
    publicPath: '/static'
    // hotUpdateChunkFilename: 'static/hot-update.js',
    // hotUpdateMainFilename: 'static/hot-update.json'  
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: { 
              sourceMap: true
            }
          }
        ]
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
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()    
  //   new BrowserSyncPlugin(
  //     {
  //       host: 'localhost',
  //       port: 3000,
  //       proxy: 'http://localhost:8080/'
  //     },
  //     {
  //       reload: false
  //     }
  //   )    
  ]
};  