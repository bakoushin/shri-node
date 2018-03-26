const {join} = require('path');

module.exports = {
  repositoryPath: join(__dirname, 'test_repo'),
  hostname: '0.0.0.0',
  port: '3000',
  dateFormat: 'DD.MM.YY HH:MM:SS'
};
