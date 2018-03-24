const express = require('express');
const router = express.Router({mergeParams: true});
const git = require('../git');

router.get('/', (req, res) => {
  git.getBranches()
    .then(branches => {
      res.render('index', {branches});
    });
});

router.get('/:branch', (req, res) => {
  const branch = req.params.branch;
  res.render('branch', {branch});
});

router.use('/:branch/files', setTreeId, require('./files'));

router.use('/:branch/commits', require('./commits'));

function setTreeId(req, res, next) {
  res.locals.treeId = req.params.branch;
  next();
}

module.exports = router;