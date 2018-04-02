const assert = require('assert');

describe('Smoke test', () => {
  it('Title should be "Git Eye"', function () {
    return this.browser
      .url('/')
      .getTitle()
      .then(text => {
        const expectedText = 'Git Eye';
        assert.ok(
          text === expectedText,
          `expected text "${expectedText}", found "${text}"`
        );
      });
  });
});
