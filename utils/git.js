const prettyBytes = require('pretty-bytes');
const uuidv1 = require('uuid/v1');
const {join} = require('path');
const exec = require('./exec');
const globals = require('./globals');

function getBranches() {
  return exec('git branch')
    .then(output => {
      return output
        .split('\n')
        .slice(0, -1)
        .map(str => {
          const [asterisk, name] = str.split(/\s+|\t+/);
          return {
            name,
            isActive: Boolean(asterisk)
          };
        });
    })
    .catch(err => console.error(err));
}

function getTree(id) {
  return exec(`git ls-tree --long ${id}`)
    .then(output => {
      return output
        .split('\n')
        .slice(0, -1)
        .map(str => {
          const [, type, id, size, name] = str.split(/\s+|\t+/);
          return {
            isDirectory: (type === 'tree'),
            id,
            size: (type === 'blob') ? prettyBytes(parseInt(size)) : '',
            name
          }
        })
        .sort((item1, item2) => {
          const diff = item2.isDirectory - item1.isDirectory;
          if (diff !== 0) {
            return diff;
          }
          else {
            const name1 = item1.name.toLowerCase();
            const name2 = item2.name.toLowerCase();
            if (name1 < name2) return -1;
            if (name1 > name2) return 1;
            return 0;
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

function getMetadata(rootObjectId, urlPath) {
  console.log(rootObjectId, urlPath)
  return exec(`git ls-tree -r -t ${rootObjectId} | awk '$4 == "${urlPath}"'`)
    .then(output => {
      console.log(output)
      if (!output) {
        throw 404;
      }
      const [, type, id, path] = output.split(/\s+|\t+/);
      return {id, type, path};
    });
}

function getTextContents(id) {
  return exec(`git show ${id}`);
}

function getFilePath(id, fileExtension) {
  const fileName = uuidv1() + fileExtension;
  const filePath = join(globals.tmpDir, fileName);
  return exec(`git show ${id} > ${filePath}`)
    .then(() => {
      return filePath;
    });
}

module.exports = {
  getBranches,
  getMetadata,
  getTree,
  getCommits,
  getTextContents,
  getFilePath
};