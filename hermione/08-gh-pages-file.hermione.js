const assert = require('assert');

describe('gh-pages file', () => {
  it('"site-assets/main.css" should start with "html"', function () {
    return this.browser
      .url('/')
      .click('a[href$=gh-pages]')
      .click('a[href$=site-assets]')
      .click('a[href$="main.css"]')
      .assertText('.Files-Code > code > span:first-child', 'html');
  });

  it('"site-assets" directory should contain 9 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .countFiles(9);
  });
});
