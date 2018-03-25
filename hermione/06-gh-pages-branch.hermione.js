const assert = require('assert');

describe('gh-pages branch', () => {

  it('"gh-pages" branch should become selected after click', function() {
    return this.browser
      .url('/')
      .click('a[href$=gh-pages]')
      .getText('.Branches-Branch_selected')
      .then(text => {
        assert.ok(text === 'gh-pages', 'failed');
      });
  });

  it('File list should contain 9 items', function() {
    return this.browser
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 9, 'failed');
      });
  });

  it('Tabs block should have "commits" link', function() {
    return this.browser
      .getText('.Tabs > .Tabs-Tab:last-child > a')
      .then(text => {
        assert.ok(text === 'commits', 'failed');
      });
  });

  it('Commit list should have 2289 items', function() {
    return this.browser
      .click('a[href$=commits]')
      .$$('.Commits-Commit')
      .then(arr => {
        assert.ok(arr.length === 2289, 'failed');
      });
  });

});