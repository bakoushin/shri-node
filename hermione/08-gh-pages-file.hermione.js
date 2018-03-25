const assert = require('assert');

describe('gh-pages file', () => {
  it('"site-assets/main.css" should start with "html"', function () {
    return this.browser
      .url('/')
      .click('a[href$=gh-pages]')
      .click('a[href$=site-assets]')
      .click('a[href$="main.css"]')
      .getText('.Files-Code > code > span:first-child')
      .then(text => {
        console.log(text);
        assert.ok(text === 'html', 'failed');
      });
  });

  it('"site-assets" directory should contain 9 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 9, 'failed');
      });
  });
});
