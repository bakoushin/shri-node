const express = require('express');
const router = express.Router({mergeParams: true});
const path = require('path');
const {unlink} = require('fs');
const globals = require('../utils/globals');

router.get('/*', (req, res) => {
  const filename = path.join(__dirname, '..', globals.tmpDir, req.params[0]);
  sendFile(res, filename)
    .then(() => {
      return deleteFile(filename);
    })
    .catch(err => {
      console.error(err);
      res.send('error');
      // TODO: error html
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