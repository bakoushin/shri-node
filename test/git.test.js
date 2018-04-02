/* eslint max-len: 0 */

const rewire = require('rewire');
const {expect} = require('chai');
const moment = require('moment');
const config = require('../config');

const git = rewire('../utils/git');

describe('Git stub test', () => {
  it('should return correct branch list', done => {
    git.__set__('spawn', (command, args) => {
      expect(command).to.be.equal('git');
      expect(args).to.have.same.members(['branch']);
      const gitOutput = ['* master', '  fake', ''].join('\n');
      return Promise.resolve(gitOutput);
    });

    const expectedResult = [
      {
        name: 'master',
        isActive: true
      },
      {
        name: 'fake',
        isActive: false
      }
    ];

    git
      .getBranches()
      .then(result => {
        expect(result).to.deep.have.same.members(expectedResult);
        done();
      })
      .catch(err => done(err));
  });

  it('should return correct tree list', done => {
    git.__set__('spawn', (command, args) => {
      expect(command).to.be.equal('git');
      expect(args).to.have.same.members(['ls-tree', '--long', 'master']);
      const gitOutput = `100644 blob 86c8f59f7dab3aeb9f6ed9f2067dc689a2da5089     223	.editorconfig
100644 blob 176a458f94e0ea5272ce67c36bf30b6be9caf623      12	.gitattributes
100644 blob 1ac4e54e0663338559b10c339c2082c46601b681      79	.gitignore
100644 blob 67c0aa66abe4d777c26fd9aed61cd0cfb1f12153    2688	.jscsrc
100644 blob b8edda2027bc4ff6cbd6a52a819b3908a4c8c6f4     311	.jshintrc
100644 blob 1f2f86feb54950846ae4796d5b950366ee5d5031      51	.mailmap
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391       0	.nojekyll
100644 blob ca50e82a60da50d3ad9a973cb4d66657c7bd16d2    7315	.travis.yml
040000 tree 54ec716ce76d91fe178b475d6b95dce5efd15c6b       -	.vscode
100644 blob 26e56f118e6fd08800e8c3bdb047a7288ad8593c      12	CNAME
100644 blob dec087c45223dc9cc3065fe57b54cc32c0f22df7    6504	app-spec.md
100644 blob 57ac0024fa128aa993a936eabc87325f52b4a5b8     333	bower.json
040000 tree 4a8048fc65ad6934d01afd4f6fd3dd0305c9d59e       -	bower_components
100644 blob 4350db17a3ea944d68a08abc6415a69863713673    1901	changelog.md
100644 blob f27ba630b9fe47a77d83f2dbf70f08adc31404dd    4169	circle.yml
100644 blob 8f0a1ece94d2d96fc4841697b379ae28b863cf23    3219	code-of-conduct.md
100644 blob f3df943bbb8c50814764f723891095ef0f0e6537    2815	codestyle.md
100644 blob aab9b0b4447657874e390632e50a96ef45d99a87    4330	contributing.md
100644 blob 068b22142be874eef3c68f350ff36fcd3f228403     156	cypress.json
040000 tree d644ca47ae2f27dd04ff2df348a50d7afa649a97       -	cypress
040000 tree 3a78d28f5cbb5b829895a57be7482c0af6d7a24b       -	examples
100644 blob 79220e4e6aa10bd77301210aed5e7356bcca0e32    2791	gulpfile.js
100644 blob 8249ff574700c40409dacfe177fa2f425609eade   31886	index.html
100644 blob 34686be6ce3a0e799a458136163d4729d933449b    1604	learn.html
100644 blob 464c7556bb5e8f40aa78a26d2d21d058a058864f   71785	learn.json
100644 blob a0d73843bbb200581ece1866529aaf1fa36ff560    1234	learn.template.json
100644 blob 9275d4371020294b6a107e454a0d1819f8b71c31    1166	license.md
040000 tree ffcbd73cb1184666beb01e786ce322797bef7933       -	media
100644 blob 0dc90d62bffcf1275d5d0cb1460f040d642a42d3    1548	package.json
100644 blob 0426706b83db2343f5287aec6fa4b5e39cfb6297    5286	readme.md
100644 blob 11b26a0c13c95cfcfbd5e930cc0dfe217d583f70     548	server.js
040000 tree d4249554408b9d8196dbae2185c6e6ad7757338e       -	site-assets
040000 tree 72b0aa2e32166ff2def09d5170f488e98f95a325       -	tasks
100755 blob ca9cbc7f5595caabbb10f323aadae4a35504d0eb    1223	test-runner.sh
040000 tree 6618eb8abe414e68d81dc63114f8148d3b430328       -	tests
040000 tree 167ba73119c227e94c9ce96d6a02840348c81863       -	tooling
`;
      return Promise.resolve(gitOutput);
    });

    const expectedResult = [
      {
        id: '54ec716ce76d91fe178b475d6b95dce5efd15c6b',
        name: '.vscode',
        size: '',
        type: 'tree'
      },
      {
        id: '4a8048fc65ad6934d01afd4f6fd3dd0305c9d59e',
        name: 'bower_components',
        size: '',
        type: 'tree'
      },
      {
        id: 'd644ca47ae2f27dd04ff2df348a50d7afa649a97',
        name: 'cypress',
        size: '',
        type: 'tree'
      },
      {
        id: '3a78d28f5cbb5b829895a57be7482c0af6d7a24b',
        name: 'examples',
        size: '',
        type: 'tree'
      },
      {
        id: 'ffcbd73cb1184666beb01e786ce322797bef7933',
        name: 'media',
        size: '',
        type: 'tree'
      },
      {
        id: 'd4249554408b9d8196dbae2185c6e6ad7757338e',
        name: 'site-assets',
        size: '',
        type: 'tree'
      },
      {
        id: '72b0aa2e32166ff2def09d5170f488e98f95a325',
        name: 'tasks',
        size: '',
        type: 'tree'
      },
      {
        id: '6618eb8abe414e68d81dc63114f8148d3b430328',
        name: 'tests',
        size: '',
        type: 'tree'
      },
      {
        id: '167ba73119c227e94c9ce96d6a02840348c81863',
        name: 'tooling',
        size: '',
        type: 'tree'
      },
      {
        id: '86c8f59f7dab3aeb9f6ed9f2067dc689a2da5089',
        name: '.editorconfig',
        size: '223 B',
        type: 'other'
      },
      {
        id: '176a458f94e0ea5272ce67c36bf30b6be9caf623',
        name: '.gitattributes',
        size: '12 B',
        type: 'other'
      },
      {
        id: '1ac4e54e0663338559b10c339c2082c46601b681',
        name: '.gitignore',
        size: '79 B',
        type: 'text'
      },
      {
        id: '67c0aa66abe4d777c26fd9aed61cd0cfb1f12153',
        name: '.jscsrc',
        size: '2.69 kB',
        type: 'other'
      },
      {
        id: 'b8edda2027bc4ff6cbd6a52a819b3908a4c8c6f4',
        name: '.jshintrc',
        size: '311 B',
        type: 'other'
      },
      {
        id: '1f2f86feb54950846ae4796d5b950366ee5d5031',
        name: '.mailmap',
        size: '51 B',
        type: 'other'
      },
      {
        id: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391',
        name: '.nojekyll',
        size: '0 B',
        type: 'other'
      },
      {
        id: 'ca50e82a60da50d3ad9a973cb4d66657c7bd16d2',
        name: '.travis.yml',
        size: '7.32 kB',
        type: 'text'
      },
      {
        id: 'dec087c45223dc9cc3065fe57b54cc32c0f22df7',
        name: 'app-spec.md',
        size: '6.5 kB',
        type: 'text'
      },
      {
        id: '57ac0024fa128aa993a936eabc87325f52b4a5b8',
        name: 'bower.json',
        size: '333 B',
        type: 'text'
      },
      {
        id: '4350db17a3ea944d68a08abc6415a69863713673',
        name: 'changelog.md',
        size: '1.9 kB',
        type: 'text'
      },
      {
        id: 'f27ba630b9fe47a77d83f2dbf70f08adc31404dd',
        name: 'circle.yml',
        size: '4.17 kB',
        type: 'text'
      },
      {
        id: '26e56f118e6fd08800e8c3bdb047a7288ad8593c',
        name: 'CNAME',
        size: '12 B',
        type: 'other'
      },
      {
        id: '8f0a1ece94d2d96fc4841697b379ae28b863cf23',
        name: 'code-of-conduct.md',
        size: '3.22 kB',
        type: 'text'
      },
      {
        id: 'f3df943bbb8c50814764f723891095ef0f0e6537',
        name: 'codestyle.md',
        size: '2.81 kB',
        type: 'text'
      },
      {
        id: 'aab9b0b4447657874e390632e50a96ef45d99a87',
        name: 'contributing.md',
        size: '4.33 kB',
        type: 'text'
      },
      {
        id: '068b22142be874eef3c68f350ff36fcd3f228403',
        name: 'cypress.json',
        size: '156 B',
        type: 'text'
      },
      {
        id: '79220e4e6aa10bd77301210aed5e7356bcca0e32',
        name: 'gulpfile.js',
        size: '2.79 kB',
        type: 'text'
      },
      {
        id: '8249ff574700c40409dacfe177fa2f425609eade',
        name: 'index.html',
        size: '31.9 kB',
        type: 'text'
      },
      {
        id: '34686be6ce3a0e799a458136163d4729d933449b',
        name: 'learn.html',
        size: '1.6 kB',
        type: 'text'
      },
      {
        id: '464c7556bb5e8f40aa78a26d2d21d058a058864f',
        name: 'learn.json',
        size: '71.8 kB',
        type: 'text'
      },
      {
        id: 'a0d73843bbb200581ece1866529aaf1fa36ff560',
        name: 'learn.template.json',
        size: '1.23 kB',
        type: 'text'
      },
      {
        id: '9275d4371020294b6a107e454a0d1819f8b71c31',
        name: 'license.md',
        size: '1.17 kB',
        type: 'text'
      },
      {
        id: '0dc90d62bffcf1275d5d0cb1460f040d642a42d3',
        name: 'package.json',
        size: '1.55 kB',
        type: 'text'
      },
      {
        id: '0426706b83db2343f5287aec6fa4b5e39cfb6297',
        name: 'readme.md',
        size: '5.29 kB',
        type: 'text'
      },
      {
        id: '11b26a0c13c95cfcfbd5e930cc0dfe217d583f70',
        name: 'server.js',
        size: '548 B',
        type: 'text'
      },
      {
        id: 'ca9cbc7f5595caabbb10f323aadae4a35504d0eb',
        name: 'test-runner.sh',
        size: '1.22 kB',
        type: 'other'
      }
    ];

    git
      .getTree('master')
      .then(result => {
        expect(result).to.deep.have.same.members(expectedResult);
        done();
      })
      .catch(err => done(err));
  });

  it('should return correct commit list', done => {
    git.__set__('spawn', (command, args) => {
      expect(command).to.be.equal('git');
      expect(args).to.have.same.members(['log', '--format=%H|%cD|%cN|%cE|%s', 'master']);
      const gitOutput = `62b950208d918925fda5204c435da0a2e14e540a|Wed, 21 Mar 2018 14:49:18 +0200|Fady Samir Sadek|fadysamirsadek@live.com|Flight: Cancel editing on ESCAPE key press (#1855)
047b1293b76b8a9c0e4908052e19ccc68aa5cafe|Fri, 16 Mar 2018 20:15:08 +0200|GitHub|noreply@github.com|added npm-run-all to the package.json file (#1865)
179a2825fca1c0a160f078583620c7aee1358974|Fri, 16 Mar 2018 16:36:55 +0200|GitHub|noreply@github.com|disable cypress recording till the creation of a CYPRESS_RECORD_KEY (#1864)
215af94a43b19a76b0c5a795e6ec3509f7e5bbc1|Fri, 16 Mar 2018 16:02:09 +0200|GitHub|noreply@github.com|Cypress test suite  <work in progress> (#1861)
2cda67b20c555f76a67dc596f06d1721f2dd4816|Wed, 7 Mar 2018 17:38:53 +0200|Fady Samir Sadek|fadysamirsadek@live.com|Merge(update projects to todomvc-app-css v2 (#1811))
544a0a52a684e231d093f4927f4eda8a94402509|Wed, 7 Mar 2018 15:07:09 +0200|Fady Samir Sadek|fadysamirsadek@live.com|(Merge)Learn page to display all the learn.json info in one place (#1552)
c5bee456a812e75162f6ef5a5f380e8e5c312456|Sat, 3 Mar 2018 04:08:06 +0200|Fady Samir Sadek|fadysamirsadek@live.com|Change command to 'npm run start' (#1807)
34e9739bd441408d36902e08d8ab8a69f6c5dc21|Thu, 8 Feb 2018 09:16:58 -0800|Sam Saccone|samccone@gmail.com|Docs: Fix typo (#1849)
fc72ed61752302acded4f8ce8ae631a718d1987e|Mon, 22 Jan 2018 18:02:51 -0800|Sam Saccone|samccone@gmail.com|Fixed Vue GitHub link (#1845)
`;
      return Promise.resolve(gitOutput);
    });

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

    git
      .getCommits('master')
      .then(result => {
        expect(result).to.deep.have.same.members(expectedResult);
        done();
      })
      .catch(err => done(err));
  });
});
