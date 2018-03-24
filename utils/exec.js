const execChildProcess = require('child_process').exec;

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

module.exports = exec;
