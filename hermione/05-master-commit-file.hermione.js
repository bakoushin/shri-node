const assert = require('assert');

describe('Master commit file', () => {
  it('"tests/.gitignore" in 10th commit should start with "node_modules"', function () {
    return this.browser
      .url('/')
      .click('a[href$=commits]')
      .click('.Commits-Commit:nth-child(10) > a.Commits-Subject')
      .click('a[href$=tests]')
      .click('a[href$=gitignore]')
      .assertText('.Files-Code > code > span:first-child', 'node_modules');
  });

  it('"tests" directory should contain 14 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .countFiles(14);
  });
});
