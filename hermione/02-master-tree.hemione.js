const assert = require('assert');

describe('Master tree', () => {

  it('"media" directory should contain 11 items', function() {
    return this.browser
      .url('/')
      .click('a[href$=media]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 11, 'failed');
      });
  });

  it('Root directory should contain 36 items', function() {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 36, 'failed');
      });
  });

});