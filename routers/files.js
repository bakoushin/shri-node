const express = require('express');
const router = new express.Router({mergeParams: true});
const removeTrailingSlash = require('remove-trailing-slash');
const git = require('../utils/git');
const render = require('../utils/render');

router.get('/', (req, res) => {
  render.renderDirectory(res);
});

router.get('/*', (req, res) => {
  const path = removeTrailingSlash(req.params[0]);
  res.locals.path = path;
  const objectId = res.locals.commit || res.locals.branch;
  git.getMetadata(objectId, path)
    .then(metadata => {
      res.locals.treeId = metadata.id;
      if (metadata.type === 'tree') {
        return render.renderDirectory(res);
      } else {
        return render.renderFile(res, metadata.type);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
});

module.exports = router;
