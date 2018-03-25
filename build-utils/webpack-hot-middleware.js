module.exports = (app) => {
  const webpackConfig = require('../webpack.config')({env: 'dev'});
  const webpack = require('webpack')(webpackConfig);
  
  app.use(require("webpack-dev-middleware")(webpack, {
    logLevel: 'warn', publicPath: webpackConfig.output.publicPath
  }));
  
  app.use(require("webpack-hot-middleware")(webpack, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
};