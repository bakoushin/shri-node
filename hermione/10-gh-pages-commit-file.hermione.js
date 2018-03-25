const assert = require('assert');

describe('Master commit file', () => {

  it('"labs/README.md" in 1000th commit should start with "# TodoMVC Labs"', function() {
    return this.browser
      .url('/')
      .click('a[href$=gh-pages]')
      .click('a[href$=commits]')
      .click('.Commits-Commit:nth-child(1000) > a.Commits-Subject')
      .click('a.Files-Link[href$=labs]')
      .click('a.Files-Link[href$="README.md"]')
      .getText('.Files-Code > code > span:first-child')
      .then(text => {
        assert.ok(text === '# TodoMVC Labs', 'failed');
      });
  });

  it('"labs" directory should contain 4 items', function() {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 4, 'failed');
      });
  });
  
});