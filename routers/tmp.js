const express = require('express');
const router = new express.Router({mergeParams: true});
const {join} = require('path');
const {unlink} = require('fs');
const globals = require('../utils/globals');
const render = require('../utils/render');

router.get('/*', (req, res, next) => {
  const filename = join(__dirname, '..', globals.tmpDir, req.params[0]);
  sendFile(res, filename)
    .then(() => {
      return deleteFile(filename);
    })
    .catch(err => {
      render.renderError(err, res);
    });
});

function sendFile(res, filename) {
  return new Promise((resolve, reject) => {
    res.sendFile(filename, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
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
