const assert = require('assert');

describe('Smoke test', () => {
  it('Title should be "Git Eye"', function() {
    return this.browser
      .url('/')
      .getTitle()
      .then(title => {
        assert.ok(title === 'Git Eye', 'failed');
      });
  });
});