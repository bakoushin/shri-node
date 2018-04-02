const express = require('express');
const router = new express.Router({mergeParams: true});
const {join} = require('path');
const git = require('../utils/git');
const render = require('../utils/render');

router.use((req, res, next) => {
  git.getBranches()
    .then(branches => {
      res.locals.branches = branches;
      next();
    })
    .catch(err => {
      next(err);
    });
});

router.get('/favicon.*', (req, res) => {
  res.sendFile(join(__dirname, '../media/favicon.png'));
});

router.use('/static', require('./static'));

router.use('/tmp', require('./tmp'));

router.use('/:branch', storeBranch, require('./branches'));

router.get('/', (req, res, next) => {
  res.locals.branch = res.locals.branches.filter(b => b.isActive)[0].name;
  res.locals.mode = 'files';
  render.renderDirectory(res)
    .catch(err => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  if (err) {
    const {message} = err;
    const code = err instanceof URIError ? 404 : 500;
    res
      .status(code)
      .render('error', {code, message});
  }
});

function storeBranch(req, res, next) {
  res.locals.branch = decodeURIComponent(req.params.branch);
  next();
}

module.exports = router;
