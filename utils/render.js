const git = require('./git');

function renderDirectory(res) {
  res.locals.path = res.locals.path || '';
  return git.getTree(res.locals.treeId || res.locals.branch)
    .then(files => {
      res.render('directory', {files});
    });
}

function renderFile(res) {
  const type = fileType(res.locals.path);
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
    });
}

function renderImage(res) {
  return git.getFilePath(res.locals.treeId, res.locals.path)
    .then(src => {
      return res.render('file-image', {src});
    });
  }
  
function renderOther(res) {
    return git.getFilePath(res.locals.treeId, res.locals.path)
      .then(href => {
        return res.render('file-other', {href});
      });
}

function fileType(path) {
  const testCases = [
    {
      type: 'image',
      ext: /\.(jpe?g|gif|png|webp|bmp|ico|svg)$/
    },
    {
      type: 'text',
      ext: /\.(s?css|sass|less|x?html?|xml|jsx?|ts|json|yml|pug|hbs|ejs|gitignore|txt|md)$/
    }
  ];
  for (const testCase of testCases) {
    if (testCase.ext.test(path)) return testCase.type;
  }
  return 'other';
 }

module.exports = {
  renderDirectory,
  renderFile
};