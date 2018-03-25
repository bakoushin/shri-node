const express = require('express');
const path = require('path');
const app = express();
const config = require('./config');

require('./build-utils/webpack-hot-middleware')(app);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.locals.repositoryPath = config.repositoryPath;

app.use(require('./routers'));

const listener = app.listen(config.port || 3000, config.hostname, () => {
  const {address, port} = listener.address();
  console.log(`App is listening on ${address}:${port}`);
})

module.exports = app;