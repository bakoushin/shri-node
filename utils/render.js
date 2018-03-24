const git = require('./git');
const {extname} = require('path');

function renderDirectory(res) {
  res.locals.path = res.locals.path || '';
  return git.getTree(res.locals.treeId || res.locals.branch)
    .then(files => {
      res.render('files', {files});
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
  const fileExtension = extname(res.locals.path);
  return git.getFilePath(res.locals.treeId, fileExtension)
    .then(src => {
      return res.render('file-image', {src});
    });
  }
  
function renderOther(res) {
  const fileExtension = extname(path);
  return git.getFilePath(res.locals.treeId, extension)
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