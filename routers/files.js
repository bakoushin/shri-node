const express = require('express');
const router = express.Router({strict: true});
const git = require('../git');

router.get("/:branch/files/:path?/", (req, res) => {
  const branch = req.params.branch;
  const path = req.params.path;

  git.getTreeMap(branch)
    .then(map => {
      return map.get(path) || branch;
    })
    .then(id => {
      console.log(id)
      return git.getFiles(id)
    })
    .then(files => {
      console.log(req.path)
      res.render('files', {
        branch,
        files
      });
    });
});

module.exports = router;