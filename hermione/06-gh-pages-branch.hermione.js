const assert = require('assert');

describe('gh-pages branch', () => {
  it('"gh-pages" branch should become selected after click', function () {
    return this.browser
      .url('/')
      .click('a[href$=gh-pages]')
      .assertText('.Branches-Branch_selected', 'gh-pages');
  });

  it('File list should contain 9 items', function () {
    return this.browser
      .countFiles(9);
  });

  it('Tabs block should have "commits" link', function () {
    return this.browser
      .assertText('.Tabs > .Tabs-Tab:last-child > a', 'commits');
  });

  it('Commit list should have 2289 items', function () {
    return this.browser
      .click('a[href$=commits]')
      .countCommits(2289);
  });
});
