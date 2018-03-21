const prettyBytes = require('pretty-bytes');
const uuidv1 = require('uuid/v1');
const {extname} = require('path');
const exec = require('./exec');

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

function getMetadata(branch, path) {
  console.log(branch, path)
  return exec(`git ls-tree -r -t ${branch} | awk '$4 == "${path}"'`)
    .then(output => {
      console.log(output)
      if (!output) {
        throw 404;
      }
      const [, type, id, path] = output.split(/\s+|\t+/);
      return {type, id, path};
    });
}

function getTextFile(id) {
  return exec(`git show ${id}`);
}

function getImage({id, path}) {
  const filename = uuidv1() + extname(path);
  return exec(`git show ${id} > public/${filename}`)
    .then(() => {
      return filename;
    });
}

/**
 * Returns files in branch
 * @param {string} id
 * @returns {Promise<Array>} array of objects {type<String>, name<String>}
 */
function getTree(id) {
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



function getCommits(branch) {
  return exec(`git log --format="%H|%cI|%cN|%cE|%s" ${branch}`)
    .then(output => {
      return output
        .split('\n')
        .slice(0, -1)
        .map(el => {
          const [id, date, name, email, subject] = el.split(/\|/);
          return {
            id,
            date,
            name,
            email,
            subject
          }
        });
    })
    .catch(err => console.error(err));
}

module.exports = {
  getBranches,
  getMetadata,
  getTree,
  getCommits,
  getTextFile,
  getImage
};
