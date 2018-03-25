const assert = require('assert');

describe('Master branch', () => {

  it('"master" branch should be selected by default', function() {
    return this.browser
      .url('/')
      .getText('.Branches-Branch_selected')
      .then(text => {
        assert.ok(text === 'master', 'failed');
      });
  });

  it('File list should contain 36 items', function() {
    return this.browser
      .url('/')
      .$$('.Files-File')
      .then(arr => {
        assert.ok(arr.length === 36, 'failed');
      });
  });

  it('Tabs block should have "commits" link', function() {
    return this.browser
      .url('/')
      .getText('.Tabs > .Tabs-Tab:last-child > a')
      .then(text => {
        assert.ok(text === 'commits', 'failed');
      });
  });

  it('Commit list should have 2841 items', function() {
    return this.browser
      .url('/')
      .click('a[href$=commits]')
      .$$('.Commits-Commit')
      .then(arr => {
        assert.ok(arr.length === 2841, 'failed');
      });
  });

});