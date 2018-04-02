const assert = require('assert');

module.exports = (hermione, opts) => {
  hermione.on(hermione.events.NEW_BROWSER, browser => {

    browser.addCommand('assertText', (selector, expectedText) => {
      return browser
        .getText(selector)
        .then(text => {
          assert.ok(
            text === expectedText,
            `expected text "${expectedText}", found "${text}"`
          );
        });
    });

    browser.addCommand('countFiles', expectedCount => {
      return browser
        .$$('.Files-File')
        .then(arr => {
          const fileCount = arr.length;
          assert.ok(
            fileCount === expectedCount,
            `expected ${expectedCount} files, found ${fileCount}`
          );
        });
    });

    browser.addCommand('countCommits', expectedCount => {
      return browser
        .$$('.Commits-Commit')
        .then(arr => {
          const commitCount = arr.length;
          assert.ok(
            commitCount === expectedCount,
            `expected ${expectedCount} commits, found ${commitCount}`
          );
        });
    });

  });
};
