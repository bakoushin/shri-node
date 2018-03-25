const express = require('express');
const path = require('path');
const app = express();

//app.use('/static', express.static(path.join(__dirname, '/static')));

const webpackConfig = require('./webpack.config')({env: 'dev'});
const webpack = require('webpack')(webpackConfig);

app.use(require("webpack-dev-middleware")(webpack, {
  logLevel: 'warn', publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(webpack, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

/*
app.use(require('webpack-dev-middleware')(webpack, {
    hot: true,
    //filename: 'script.js',
    publicPath: '/static/',
    historyApiFallback: true
}));
app.use(require("webpack-hot-middleware")(webpack, {
  log: console.log, 
  path: '/__webpack_hmr', 
  heartbeat: 10 * 1000
}));
*/

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(require('./routers'));

const listener = app.listen(3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

