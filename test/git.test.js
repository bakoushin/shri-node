const rewire = require('rewire');
const {expect} = require('chai');

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
    const stub = require('./git.stub.tree');

    git.__set__('spawn', (command, args) => {
      expect(command).to.be.equal('git');
      expect(args).to.have.same.members(['ls-tree', '--long', 'master']);
      return Promise.resolve(stub.output);
    });

    git
      .getTree('master')
      .then(result => {
        expect(result).to.deep.have.same.members(stub.expectedResult);
        done();
      })
      .catch(err => done(err));
  });

  it('should return correct commit list', done => {
    const stub = require('./git.stub.commit');

    git.__set__('spawn', (command, args) => {
      expect(command).to.be.equal('git');
      expect(args).to.have.same.members(['log', '--format=%H|%cD|%cN|%cE|%s', 'master']);
      return Promise.resolve(stub.output);
    });

    git
      .getCommits('master')
      .then(result => {
        expect(result).to.deep.have.same.members(stub.expectedResult);
        done();
      })
      .catch(err => done(err));
  });
});
