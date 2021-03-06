const express = require('express');
const path = require('path');
const app = express();
const config = require('./config');

if (process.env.NODE_ENV === 'dev') {
  require('./build-utils/webpack-hot-middleware')(app);
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.locals.repositoryPath = config.repositoryPath;

app.use(require('./routers'));

const listener = app.listen(config.port, config.hostname, () => {
  const {address, port} = listener.address();
  console.log(`App is listening on ${address}:${port}`);
});

module.exports = app;
