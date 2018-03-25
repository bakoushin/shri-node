const git = require('./git');
const {extname} = require('path');

function renderDirectory (res) {
  res.locals.path = res.locals.path || '';
  res.locals.breadcrumbs = computeBreadcrumbs(res);
  return git.getTree(res.locals.treeId || res.locals.branch)
    .then(files => {
      return render(res, 'files', {files});
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function renderFile (res, type) {
  res.locals.breadcrumbs = computeBreadcrumbs(res);
  if (type === 'text') {
    return renderText(res);
  } else if (type === 'image') {
    return renderImage(res);
  } else {
    return renderOther(res);
  }
}

function renderText (res) {
  return git.getTextContents(res.locals.treeId)
    .then(text => {
      return render(res, 'file-text', {text});
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function renderImage (res) {
  const fileExtension = extname(res.locals.path);
  return git.getFilePath(res.locals.treeId, fileExtension)
    .then(src => {
      return render(res, 'file-image', {src});
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function renderOther (res) {
  const fileExtension = extname(res.locals.path);
  return git.getFilePath(res.locals.treeId, fileExtension)
    .then(href => {
      return render(res, 'file-other', {href});
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function render (res, view, locals) {
  return new Promise((resolve, reject) => {
    res.render(view, locals, (err, html) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      res.send(html);
      resolve();
    });
  });
}

function computeBreadcrumbs (res) {
  if (!res.locals.path) {
    return [];
  }
  let breadcrumbs = res.locals.path.split('/');
  breadcrumbs = breadcrumbs.map((v, i) => {
    return {
      name: v,
      path: breadcrumbs.slice(0, i + 1).join('/')
    };
  });
  breadcrumbs[breadcrumbs.length - 1].path = '';
  return breadcrumbs;
}

module.exports = {
  renderDirectory,
  renderFile
};
