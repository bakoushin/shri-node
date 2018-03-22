const prettyBytes = require('pretty-bytes');
const uuidv1 = require('uuid/v1');
const path = require('path');
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

function getMetadata(branch, urlPath) {
  console.log(branch, urlPath)
  return exec(`git ls-tree -r -t ${branch} | awk '$4 == "${urlPath}"'`)
    .then(output => {
      console.log(output)
      if (!output) {
        throw 404;
      }
      const [, type, id, fullpath] = output.split(/\s+|\t+/);
      return {id, type, fullpath};
    });
}

function getTextFile(id) {
  return exec(`git show ${id}`);
}

function getImage({id, path, extname}) {
  const filename = uuidv1() + extname;
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
