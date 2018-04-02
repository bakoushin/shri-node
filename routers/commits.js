const express = require('express');
const router = new express.Router({mergeParams: true});
const git = require('../utils/git');

router.use('/:commit', setTreeId, require('./commit'));

router.get('/', (req, res, next) => {
  git.getCommits(res.locals.branch)
    .then(commits => {
      return res.render('commits', {commits});
    })
    .catch(err => {
      next(err);
    });
});

function setTreeId(req, res, next) {
  res.locals.treeId = req.params.commit;
  res.locals.commit = req.params.commit;
  next();
}

module.exports = router;
