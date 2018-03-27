const {hostname, port} = require('./config');

const gridUrl = process.env.TRAVIS
  ? `http://bakoushin:${process.env.SAUCELABS_AUTH}@localhost:4445/wd/hub`
  : 'http://0.0.0.0:4444/wd/hub';

module.exports = {
  baseUrl: `http://${hostname}:${port}`,
  gridUrl: gridUrl,
  "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER,
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
