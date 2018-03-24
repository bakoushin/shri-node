const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routers'));

const listener = app.listen(3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})

