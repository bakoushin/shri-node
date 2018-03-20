const exec = require('./exec');
const prettyBytes = require('pretty-bytes');

/**
 * Returns all branches in repo
 * @returns {Promise<Array>} array of strings
 */
function getBranches() {
  return exec('git branch | cut -c 3-')
    .then(stdout => {
      return stdout
        .split('\n')
        .slice(0, -1);
    })
    .catch(err => console.error(err));
}

/**
 * Returns branch tree map
 * @param {String} branch name
 * @returns {Promise<Map>} tree map
 */
function getTreeMap(branch) {
  return exec(`git ls-tree -r -d ${branch}`)
    .then(output => {
      return output
        .split('\n')
        .slice(0, -1)
        .reduce((map, el) => {
          const [,, id, path] = el.split(/\s+|\t+/);
          return map.set(path, id);
        }, new Map);
    });
}


/**
 * Returns files in branch
 * @param {string} id
 * @returns {Promise<Array>} array of objects {type<String>, name<String>}
 */
function getFiles(id) {
  return exec(`git ls-tree --long ${id}`)
    .then(output => {
      return output
        .split('\n')
        .slice(0, -1)
        .map(el => {
          const [, type, id, size, name] = el.split(/\s+|\t+/);
          return {
            isDirectory: (type === 'tree'),
            id,
            size: (type === 'blob') ? prettyBytes(parseInt(size)) : size,
            name
          }
        });
    })
    .catch(err => console.error(err));
}

module.exports = {
  getBranches,
  getTreeMap,
  getFiles
};
