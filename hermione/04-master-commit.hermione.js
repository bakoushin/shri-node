const assert = require('assert');

describe('Master commit', () => {
  it('10th commit should have 31 files', function () {
    return this.browser
      .url('/')
      .click('a[href$=commits]')
      .click('.Commits-Commit:nth-child(10) > a.Commits-Subject')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 31, 'failed');
      });
  });

  it('"media" directory should contain 11 items', function () {
    return this.browser
      .click('a.Files-Link[href$=media]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 11, 'failed');
      });
  });

  it('Root commit directory should contain 31 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 31, 'failed');
      });
  });
});
