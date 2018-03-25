const assert = require('assert');

describe('gh-pages commit', () => {
  it('1000th commit should have 23 files', function () {
    return this.browser
      .url('/')
      .click('a[href$=gh-pages]')
      .click('a[href$=commits]')
      .click('.Commits-Commit:nth-child(1000) > a.Commits-Subject')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 23, 'failed');
      });
  });

  it('"labs" directory should contain 4 items', function () {
    return this.browser
      .click('a.Files-Link[href$=labs]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 4, 'failed');
      });
  });

  it('Root commit directory should contain 23 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 23, 'failed');
      });
  });
});
