const express = require('express');
const router = express.Router({mergeParams: true});
const git = require('../git');

router.get("/", (req, res) => {
  const branch = req.params.branch;
  const basePath = `${branch}/commits`;
  git.getCommits(branch)
    .then(commits => {
      res.render('commits', {
        branch,
        commits,
        basePath
      });
    });
});

router.use("/:commit", setTreeId, require('./files'));

function setTreeId(req, res, next) {
  res.locals.treeId = req.params.commit;
  next();
}

module.exports = router;