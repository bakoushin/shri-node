const express = require('express');
const router = new express.Router({mergeParams: true});
const {join} = require('path');
const {unlink} = require('fs');
const globals = require('../utils/globals');

router.get('/*', (req, res) => {
  const filename = join(__dirname, '..', globals.tmpDir, req.params[0]);
  sendFile(res, filename)
    .then(() => {
      return deleteFile(filename);
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
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
  })
    .catch(err => {
      console.error(err);
      res.status(500).end();
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
