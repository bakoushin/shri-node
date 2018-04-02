const assert = require('assert');

describe('gh-pages commit', () => {
  it('1000th commit should have 23 files', function () {
    return this.browser
      .url('/')
      .click('a[href$=gh-pages]')
      .click('a[href$=commits]')
      .click('.Commits-Commit:nth-child(1000) > a.Commits-Subject')
      .countFiles(23);
  });

  it('"labs" directory should contain 4 items', function () {
    return this.browser
      .click('a.Files-Link[href$=labs]')
      .countFiles(4);
  });

  it('Root commit directory should contain 23 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .countFiles(23);
  });
});
