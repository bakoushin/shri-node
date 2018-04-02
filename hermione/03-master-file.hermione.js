const assert = require('assert');

describe('Master file', () => {
  it('"tests/.gitignore" should start with "node_modules"', function () {
    return this.browser
      .url('/')
      .click('a[href$=tests]')
      .click('a[href$=gitignore]')
      .assertText('.Files-Code > code > span:first-child', 'node_modules');
  });

  it('"tests" directory should contain 16 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .countFiles(16);
  });
});
