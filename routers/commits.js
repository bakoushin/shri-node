const express = require('express');
const router = express.Router({strict: true});
const git = require('../git');

router.get("/:branch/commits/", (req, res) => {
  const branch = req.params.branch;

  git.getCommits(branch)
    .then(commits => {
      res.render('commits', {
        branch,
        commits
      });
    });
});

module.exports = router;