const {hostname, port} = require('./config');

const gridUrl = process.env.TRAVIS
  ? `http://bakoushin:${process.env.SAUCELABS_AUTH}@localhost:4445/wd/hub`
  : 'http://0.0.0.0:4444/wd/hub';

console.log(`Base URL: http://${hostname}:${port}`);

module.exports = {
  baseUrl: `http://${hostname}:${port}`,
  gridUrl: gridUrl,
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox'
      }
    }
  }
};
