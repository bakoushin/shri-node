const {hostname, port} = require('./config');
const hermioneCustomCommands = require('./hermione-custom-commands');

const gridUrl = process.env.TRAVIS
  ? `http://bakoushin:${process.env.SAUCELABS_AUTH}@localhost:4445/wd/hub`
  : 'http://0.0.0.0:4444/wd/hub';

module.exports = {
  baseUrl: `http://${hostname}:${port}`,
  gridUrl: gridUrl,
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
      }
    }
  },
  plugins: {
    'hermione-custom-commands': true,
    'html-reporter/hermione': {
      path: 'hermione-html-report'
    }
  }
};
