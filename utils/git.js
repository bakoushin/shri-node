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
      if (!output) {
        throw new Error('Repository seems to be empty.');
      }
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
    });
}

function getTree(treeId) {
  return spawn('git', ['ls-tree', '--long', treeId])
    .then(output => {
      if (!output) {
        throw new URIError(`Not found ${treeId}.`);
      }
      const items = output
        .split('\n')
        .slice(0, -1)
        .map(str => {
          const [, type, id, size, name] = str.split(/\s+|\t+/);
          return {id, name, type, size};
        });

      const directories = items
        .filter(item => item.type === 'tree')
        .sort(alphabetSort);

      const files = items
        .filter(item => item.type === 'blob')
        .map(item => {
          item.type = fileType(item.name);
          item.size = prettyBytes(parseInt(item.size));
          return item;
        })
        .sort(alphabetSort);

      return [...directories, ...files];

      function alphabetSort(item1, item2) {
        const name1 = item1.name.toLowerCase();
        const name2 = item2.name.toLowerCase();
        if (name1 < name2) {
          return -1;
        }
        if (name1 > name2) {
          return 1;
        }
        return 0;
      }
    });
}

function getCommits(branch) {
  return spawn('git', ['log', '--format=%H|%cD|%cN|%cE|%s', branch])
    .then(output => {
      if (!output) {
        throw new URIError('No commits found.');
      }
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
          };
        });
    });
}

function getMetadata(rootObjectId, urlPath) {
  return pipe('git', ['ls-tree', '-r', '-t', rootObjectId], 'awk', [`{if ($4 == "${urlPath}") print $0}`])
    .then(output => {
      if (!output) {
        throw new URIError(`Not found "${urlPath}" in branch "${rootObjectId}".`);
      }
      const [, type, id, path] = output.split(/\s+|\t+/);
      return {
        id,
        path,
        type: (type === 'tree') ? type : fileType(path)
      };
    });
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
    });
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
    if (testCase.ext.test(path)) {
      return testCase.type;
    }
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
