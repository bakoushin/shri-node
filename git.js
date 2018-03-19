const exec = require('./exec');

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
 * Returns all files in branch
 * @returns {Promise<Array>} array of objects {type<String>, name<String>}
 */
function getAllFiles(branch) {
  return exec(`git ls-tree --abbrev ${branch}`)
    .then(stdout => {
      return stdout
        .split('\n')
        .filter(el => el)
        .map(el => {
          const arr = el.split(/\t|\s/);
          return {
            type: arr[1],
            name: arr[3]
          }
        });
    })
    .catch(err => console.error(err));
}

module.exports = {
  getAllBranches,
  getAllFiles
};
