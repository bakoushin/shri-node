const express = require('express');
const router = express.Router({strict: true});
const git = require('../git');
const {unlink} = require('fs');
const path = require('path');

router.get('/:branch/files/', (req, res) => {
  const branch = req.params.branch;
  renderDirectory(res, branch);
});

router.get('/public/*', (req, res) => {
  const filename = path.join(__dirname, '../public', req.params[0]);
  sendFile(res, filename)
    .then(() => {
      return deleteFile(filename);
    });
});

function sendFile(res, filename) {
  return new Promise((resolve, reject) => {
    res.sendFile(filename, err => {
      if (err) {
        reject(err);
      }
      resolve();
    })
  });
}

router.get('/:branch/files/*', (req, res) => {
  const branch = req.params.branch;
  const path = req.params[0];
  git.getMetadata(branch, path)
    .then(metadata => {
      if (metadata.type == 'tree') {
        return renderDirectory(res, metadata.id);
      }
      else {
        const type = fileType(path);
        console.log(type)
        switch (type) {
          case 'text':
            return renderTextFile(res, metadata.id);
            break;
          case 'image':
            return renderImage(res, metadata);
            break;
          default:
        }
      }
    })
    .catch(err => {
      console.error(err);
    });
});

function renderDirectory(res, treeId) {
  git.getTree(treeId)
    .then(files => {
      res.render('directory', {files});
    });
}

function renderTextFile(res, treeId) {
  git.getTextFile(treeId)
    .then(text => {
      res.render('file-text', {text});
    });
}

function renderImage(res, metadata) {
  git.getImage(metadata)
    .then(src => {
      return res.render('file-image', {src});
    });
}

function fileType(path) {
  const imageTypes = /\.(jpe?g|gif|png|webp|bmp|ico|svg)$/;
  const textTypes = /\.(s?css|sass|less|x?html?|xml|jsx?|ts|json|yml|pug|hbs|ejs|gitignore|txt|md)$/;
  if (textTypes.test(path)) {
    return 'text';
  }
  if (imageTypes.test(path)) {
    return 'image';
  }
  return 'other';
}

function deleteFile(path) {
  return new Promise((resolve, reject) => {
    unlink(path, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

module.exports = router;