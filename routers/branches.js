const express = require('express');
const router = express.Router({strict: true});
const git = require('../git');

router.get('/', (req, res) => {
  git.getBranches()
    .then(branches => {
      res.render('index', {branches});
    });
});

router.get('/:branch/', (req, res) => {
  const branch = req.params.branch;
  res.render('branch', {branch});
});

module.exports = router;