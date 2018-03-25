const git = require('./git');
const {extname} = require('path');

function renderDirectory(res) {
  res.locals.path = res.locals.path || '';
  res.locals.breadcrumbs = computeBreadcrumbs(res);
  return git.getTree(res.locals.treeId || res.locals.branch)
    .then(files => {
      res.render('files', {files});
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function renderFile(res, type) {
  res.locals.breadcrumbs = computeBreadcrumbs(res);
  switch (type) {
    case 'text':
      return renderText(res);
      break;
    case 'image':
      return renderImage(res);
      break;
    default:
      return renderOther(res);
  }
}  

function renderText(res) {
  return git.getTextContents(res.locals.treeId)
    .then(text => {
      res.render('file-text', {text});
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function renderImage(res) {
  const fileExtension = extname(res.locals.path);
  return git.getFilePath(res.locals.treeId, fileExtension)
    .then(src => {
      return res.render('file-image', {src});
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
  
function renderOther(res) {
  const fileExtension = extname(res.locals.path);
  return git.getFilePath(res.locals.treeId, fileExtension)
    .then(href => {
      return res.render('file-other', {href});
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function computeBreadcrumbs(res) {
  if (!res.locals.path) {
    return [];
  }
  breadcrumbs = res.locals.path.split('/');
  breadcrumbs = breadcrumbs.map((v, i) => {
    return {
      name: v,
      path: breadcrumbs.slice(0, i + 1).join('/')
    }
  });
  breadcrumbs[breadcrumbs.length - 1].path = '';
  console.dir(breadcrumbs)
  return breadcrumbs;
}

module.exports = {
  renderDirectory,
  renderFile
};