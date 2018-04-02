const assert = require('assert');

describe('Master commit', () => {
  it('10th commit should have 31 files', function () {
    return this.browser
      .url('/')
      .click('a[href$=commits]')
      .click('.Commits-Commit:nth-child(10) > a.Commits-Subject')
      .countFiles(31);
  });

  it('"media" directory should contain 11 items', function () {
    return this.browser
      .click('a.Files-Link[href$=media]')
      .countFiles(11);
  });

  it('Root commit directory should contain 31 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .countFiles(31);
  });
});
