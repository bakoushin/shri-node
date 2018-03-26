const webpack = require('webpack');
const projectPath = require('./paths');

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
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
