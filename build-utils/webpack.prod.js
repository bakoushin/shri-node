const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const projectPath = require('./paths');

module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new UglifyJsPlugin({
      sourceMap: true,
      cache: true,
      parallel: true,
      uglifyOptions: {
        mangle: {
          // fix for Safari 10 `let` bug:
          // https://bugs.webkit.org/show_bug.cgi?id=171041
          safari10: true
        }
      }
    })
  ]
};
