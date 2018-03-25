const express = require('express');
const router = express.Router({mergeParams: true});
const git = require('../utils/git');

router.get("/", (req, res) => {
  git.getCommits(res.locals.branch)
    .then(commits => {
      res.render('commits', {commits});
    });
});

router.use("/:commit", setTreeId, require('./commit'));

function setTreeId(req, res, next) {
  res.locals.treeId = req.params.commit;
  res.locals.commit = req.params.commit;
  next();
}

module.exports = router;