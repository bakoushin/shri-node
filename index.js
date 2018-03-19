const express = require('express');
const path = require('path');
const app = express();
const git = require('./git');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

//app.use(express.static('public'))

app.get("/", async (req, res) => {
  git.getAllBranches()
    .then(branches => {
      res.render('index', {branches});
    });
});

app.get("/:branch", async (req, res) => {
  const branch = req.params.branch;
  git.getAllFiles(branch)
    .then(files => {
      res.render('branch', {
        branch,
        files
      });
    });
});

const listener = app.listen(3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
