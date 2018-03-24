const express = require('express');
const router = express.Router({mergeParams: true});
const git = require('../utils/git');
const render = require('../utils/render');

router.use((req, res, next) => {
  git.getBranches()
    .then(branches => {
      res.locals.branches = branches;
      next();
    });
});

router.get('/', (req, res) => {
  res.locals.branch = res.locals.branches.filter(b => b.isActive)[0].name;
  render.renderDirectory(res);
});

router.use('/tmp', require('./tmp'));

router.use('/:branch', storeBranch, require('./branches'));

function storeBranch(req, res, next) {
  res.locals.branch = req.params.branch;
  next();
}

module.exports = router;