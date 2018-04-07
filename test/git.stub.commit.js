/* eslint max-len: 0 */

const output = `62b950208d918925fda5204c435da0a2e14e540a|Wed, 21 Mar 2018 14:49:18 +0200|Fady Samir Sadek|fadysamirsadek@live.com|Flight: Cancel editing on ESCAPE key press (#1855)
047b1293b76b8a9c0e4908052e19ccc68aa5cafe|Fri, 16 Mar 2018 20:15:08 +0200|GitHub|noreply@github.com|added npm-run-all to the package.json file (#1865)
179a2825fca1c0a160f078583620c7aee1358974|Fri, 16 Mar 2018 16:36:55 +0200|GitHub|noreply@github.com|disable cypress recording till the creation of a CYPRESS_RECORD_KEY (#1864)
215af94a43b19a76b0c5a795e6ec3509f7e5bbc1|Fri, 16 Mar 2018 16:02:09 +0200|GitHub|noreply@github.com|Cypress test suite  <work in progress> (#1861)
2cda67b20c555f76a67dc596f06d1721f2dd4816|Wed, 7 Mar 2018 17:38:53 +0200|Fady Samir Sadek|fadysamirsadek@live.com|Merge(update projects to todomvc-app-css v2 (#1811))
544a0a52a684e231d093f4927f4eda8a94402509|Wed, 7 Mar 2018 15:07:09 +0200|Fady Samir Sadek|fadysamirsadek@live.com|(Merge)Learn page to display all the learn.json info in one place (#1552)
c5bee456a812e75162f6ef5a5f380e8e5c312456|Sat, 3 Mar 2018 04:08:06 +0200|Fady Samir Sadek|fadysamirsadek@live.com|Change command to 'npm run start' (#1807)
34e9739bd441408d36902e08d8ab8a69f6c5dc21|Thu, 8 Feb 2018 09:16:58 -0800|Sam Saccone|samccone@gmail.com|Docs: Fix typo (#1849)
fc72ed61752302acded4f8ce8ae631a718d1987e|Mon, 22 Jan 2018 18:02:51 -0800|Sam Saccone|samccone@gmail.com|Fixed Vue GitHub link (#1845)
`;

const moment = require('moment');
const config = require('../config');
function formatDate(date) {
  return moment(date).format(config.dateFormat);
}

const expectedResult = [
  {
    date: formatDate('Wed, 21 Mar 2018 14:49:18 +0200'),
    email: 'fadysamirsadek@live.com',
    id: '62b950208d918925fda5204c435da0a2e14e540a',
    name: 'Fady Samir Sadek',
    subject: 'Flight: Cancel editing on ESCAPE key press (#1855)'
  },
  {
    date: formatDate('Fri, 16 Mar 2018 20:15:08 +0200'),
    email: 'noreply@github.com',
    id: '047b1293b76b8a9c0e4908052e19ccc68aa5cafe',
    name: 'GitHub',
    subject: 'added npm-run-all to the package.json file (#1865)'
  },
  {
    date: formatDate('Fri, 16 Mar 2018 16:36:55 +0200'),
    email: 'noreply@github.com',
    id: '179a2825fca1c0a160f078583620c7aee1358974',
    name: 'GitHub',
    subject:
      'disable cypress recording till the creation of a CYPRESS_RECORD_KEY (#1864)'
  },
  {
    date: formatDate('Fri, 16 Mar 2018 16:02:09 +0200'),
    email: 'noreply@github.com',
    id: '215af94a43b19a76b0c5a795e6ec3509f7e5bbc1',
    name: 'GitHub',
    subject: 'Cypress test suite  <work in progress> (#1861)'
  },
  {
    date: formatDate('Wed, 7 Mar 2018 17:38:53 +0200'),
    email: 'fadysamirsadek@live.com',
    id: '2cda67b20c555f76a67dc596f06d1721f2dd4816',
    name: 'Fady Samir Sadek',
    subject: 'Merge(update projects to todomvc-app-css v2 (#1811))'
  },
  {
    date: formatDate('Wed, 7 Mar 2018 15:07:09 +0200'),
    email: 'fadysamirsadek@live.com',
    id: '544a0a52a684e231d093f4927f4eda8a94402509',
    name: 'Fady Samir Sadek',
    subject:
      '(Merge)Learn page to display all the learn.json info in one place (#1552)'
  },
  {
    date: formatDate('Sat, 3 Mar 2018 04:08:06 +0200'),
    email: 'fadysamirsadek@live.com',
    id: 'c5bee456a812e75162f6ef5a5f380e8e5c312456',
    name: 'Fady Samir Sadek',
    subject: 'Change command to \'npm run start\' (#1807)'
  },
  {
    date: formatDate('Thu, 8 Feb 2018 09:16:58 -0800'),
    email: 'samccone@gmail.com',
    id: '34e9739bd441408d36902e08d8ab8a69f6c5dc21',
    name: 'Sam Saccone',
    subject: 'Docs: Fix typo (#1849)'
  },
  {
    date: formatDate('Mon, 22 Jan 2018 18:02:51 -0800'),
    email: 'samccone@gmail.com',
    id: 'fc72ed61752302acded4f8ce8ae631a718d1987e',
    name: 'Sam Saccone',
    subject: 'Fixed Vue GitHub link (#1845)'
  }
];

module.exports = {output, expectedResult};
