const {hostname, port} = require('./config');

const localUrl = {
  base: `http://${hostname}:${port}`,
  grid: 'http://0.0.0.0:4444/wd/hub'
};

const travisUrl = {
  base: `${process.env.LT_SUBDOMAIN}.localtunnel.me`,
  grid: `http://bakoushin:${process.env.SAUCELABS_AUTH}@ondemand.saucelabs.com:80/wd/hub`
};

const url = process.env.TRAVIS
  ? travisUrl
  : localUrl;

module.exports = {
  baseUrl: url.base,
  gridUrl: url.grid,
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
