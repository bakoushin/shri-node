const express = require('express');
const path = require('path');
const app = express();
const slash = require('express-slash');
const git = require('./git');

app.enable('strict routing');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//app.use(express.static(path.join(__dirname, 'public')));

const branches = require('./routers/branches');
const files = require('./routers/files');
const commits = require('./routers/commits');

app.use(branches);
app.use(files);
app.use(commits);
app.use(slash());

const listener = app.listen(3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
