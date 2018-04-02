const assert = require('assert');

describe('Master branch', () => {
  it('"master" branch should be selected by default', function () {
    return this.browser
      .url('/')
      .assertText('.Branches-Branch_selected', 'master');
  });

  it('File list should contain 36 items', function () {
    return this.browser
      .url('/')
      .countFiles(36);
  });

  it('Tabs block should have "commits" link', function () {
    return this.browser
      .url('/')
      .assertText('.Tabs > .Tabs-Tab:last-child > a', 'commits');
  });

  it('Commit list should have 2841 items', function () {
    return this.browser
      .url('/')
      .click('a[href$=commits]')
      .countCommits(2841);
  });
});
