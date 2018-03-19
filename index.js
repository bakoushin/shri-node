const express = require('express');
const path = require('path');
const app = express();
const execChildProcess = require('child_process').exec;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, "views"));

//app.use(express.static('public'))

app.get("/", async (req, res) => {
  getAllBranches()
    .then(branches => {
      res.render('index', {branches});
    });
});

/**
 * Returns all branches in repo
 * @returns {Promise<Array>} array of strings
 */
function getAllBranches() {
  return exec('git branch | cut -c 3-')
    .then(stdout => {
      return stdout
        .split('\n')
        .filter(el => el);
    })
    .catch(err => console.error(err));
}

/**
 * Executes shell command
 * @param {string} command 
 * @returns {Promise<string>} stdout of executed command
 */
function exec(command) {
  return new Promise((resolve, reject) => {
    execChildProcess(command, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(stdout);
    });
  });
}

const listener = app.listen(3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})
