const prettyBytes = require('pretty-bytes');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const {join} = require('path');
const {spawn, pipe, file} = require('./exec');
const globals = require('./globals');
const config = require('../config');

function getBranches() {
  return spawn('git', ['branch'])
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
  return spawn('git', ['ls-tree', '--long', id])
    .then(output => {
      return output
        .split('\n')
        .slice(0, -1)
        .map(str => {
          const [, type, id, size, name] = str.split(/\s+|\t+/);
          return {
            id,
            name,
            type: (type === 'tree') ? type : fileType(name),
            size: (type === 'blob') ? prettyBytes(parseInt(size)) : ''
          }
        })
        .sort((item1, item2) => {
          const isTree1 = item1.type === 'tree';
          const isTree2 = item2.type === 'tree';
          const diff = isTree2 - isTree1;
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
  return spawn('git', ['log', '--format=%H|%cI|%cN|%cE|%s', branch])
    .then(output => {
      return output
        .split('\n')
        .slice(0, -1)
        .map(el => {
          const [id, date, name, email, subject] = el.split(/\|/);
          return {
            id,
            name,
            email,
            subject,
            date: moment(date).format(config.dateFormat)
          }
        });
    })
    .catch(err => console.error(err));
}

function getMetadata(rootObjectId, urlPath) {
  return pipe('git', ['ls-tree', '-r', '-t', rootObjectId], 'awk', [`{if ($4 == "${urlPath}") print $0}`])
    .then(output => {
      if (!output) {
        throw `Error while getting metadata: not found "${urlPath}" in tree "${rootObjectId}"`;
      }
      const [, type, id, path] = output.split(/\s+|\t+/);
      return {
        id, 
        path,
        type: (type === 'tree') ? type : fileType(path)
      };
    })
    .catch(err => console.error(err));
}

function getTextContents(id) {
  return spawn('git', ['show', id]);
}

function getFilePath(id, fileExtension) {
  const fileName = uuidv1() + fileExtension;
  const filePath = join(globals.tmpDir, fileName);
  return file('git', ['show', id], filePath)
    .then(() => {
      return filePath;
    })
    .catch(err => console.error(err));
}

function fileType(path) {
  const testCases = [
    {
      type: 'image',
      ext: /\.(jpe?g|gif|png|webp|bmp|ico|svg)$/
    },
    {
      type: 'text',
      ext: /\.(s?css|sass|less|x?html?|xml|jsx?|ts|json|yml|pug|hbs|ejs|gitignore|txt|md)$/
    }
  ];
  for (const testCase of testCases) {
    if (testCase.ext.test(path)) return testCase.type;
  }
  return 'other';
}

module.exports = {
  getBranches,
  getMetadata,
  getTree,
  getCommits,
  getTextContents,
  getFilePath
};