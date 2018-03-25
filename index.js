const express = require('express');
const path = require('path');
const app = express();
const config = require('./config');

const webpackConfig = require('./webpack.config')({env: 'dev'});
const webpack = require('webpack')(webpackConfig);

app.use(require("webpack-dev-middleware")(webpack, {
  logLevel: 'warn', publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(webpack, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(require('./routers'));

const listener = app.listen(config.port || 3000, config.hostname, () => {
  const {address, port} = listener.address();
  console.log(`App is listening on ${address}:${port}`);
})

