const assert = require('assert');

describe('Master tree', () => {
  it('"media" directory should contain 11 items', function () {
    return this.browser
      .url('/')
      .click('a[href$=media]')
      .countFiles(11);
  });

  it('Root directory should contain 36 items', function () {
    return this.browser
      .click('a.Files-Link[href$=".."]')
      .countFiles(36);
  });
});
