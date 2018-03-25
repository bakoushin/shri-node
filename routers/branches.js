const express = require('express');
const router = express.Router({mergeParams: true});

const commitsRouter = require('./commits');
const filesRouter = require('./files');

router.use('/commits', setCommitsMode, commitsRouter);
router.use('/files', setFilesMode, filesRouter);
router.use('/', setFilesMode, filesRouter);

function setCommitsMode (req, res, next) {
  res.locals.mode = 'commits';
  next();
}

function setFilesMode (req, res, next) {
  res.locals.mode = 'files';
  next();
}

module.exports = router;
