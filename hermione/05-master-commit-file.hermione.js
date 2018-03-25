const assert = require('assert');

describe('Master commit file', () => {
  it('"tests/.gitignore" in 10th commit should start with "node_modules"', function () {
    return this.browser
      .url('/')
      .click('a[href$=commits]')
      .click('.Commits-Commit:nth-child(10) > a.Commits-Subject')
      .click('a[href$=tests]')
      .click('a[href$=gitignore]')
      .getText('.Files-Code > code > span:first-child')
      .then(text => {
        assert.ok(text === 'node_modules', 'failed');
      });
  });

  it('"tests" directory should contain 14 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 14, 'failed');
      });
  });
});
