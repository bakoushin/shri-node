const express = require('express');
const router = new express.Router({mergeParams: true});
const removeTrailingSlash = require('remove-trailing-slash');
const git = require('../utils/git');
const render = require('../utils/render');

router.get('/*', (req, res, next) => {
  const path = removeTrailingSlash(req.params[0]);
  res.locals.path = path;
  const objectId = res.locals.commit || res.locals.branch;
  const action = path === '' ?
    render.renderDirectory(res) :
    git.getMetadata(objectId, path)
      .then(metadata => {
        res.locals.treeId = metadata.id;
        if (metadata.type === 'tree') {
          return render.renderDirectory(res);
        } else {
          return render.renderFile(res, metadata.type);
        }
      });
  action
    .catch(err => {
      next(err);
    });
});

module.exports = router;
