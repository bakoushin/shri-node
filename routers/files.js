const express = require('express');
const router = express.Router({mergeParams: true});
const removeTrailingSlash = require('remove-trailing-slash');
const git = require('../utils/git');
const render = require('../utils/render');

router.get('/', (req, res) => {
  render.renderDirectory(res);
});

router.get('/*', (req, res) => {
  const path = removeTrailingSlash(req.params[0]);
  res.locals.path = path;
  git.getMetadata(res.locals.branch, path)
    .then(metadata => {
      res.locals.treeId = metadata.id;
      if (metadata.type === 'tree') {
        return render.renderDirectory(res);
      }
      else {
        return render.renderFile(res);
      }
    })
    .catch(err => {
      console.error(err);
      // TODO: render error page
      res.send('error occured');
    });
});

module.exports = router;