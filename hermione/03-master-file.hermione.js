const assert = require('assert');

describe('Master file', () => {

  it('"tests/.gitignore" should start with "node_modules"', function() {
    return this.browser
      .url('/')
      .click('a[href$=tests]')
      .click('a[href$=gitignore]')
      .getText('.Files-Code > code > span:first-child')
      .then(text => {
        assert.ok(text === 'node_modules', 'failed');
      });
  });

  it('"tests" directory should contain 16 items', function() {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 16, 'failed');
      });
  });

});