const assert = require('assert');

describe('gh-pages tree', () => {

  it('"site-assets" directory should contain 9 items', function() {
    return this.browser
      .url('/')
      .click('a[href$=gh-pages]')
      .click('a[href$=site-assets]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 9, 'failed');
      });
  });

  it('Root directory should contain 9 items', function() {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 9, 'failed');
      });
  });

});