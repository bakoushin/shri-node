const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Server test', () => {
  describe('master branch', () => {
    const urls200 = [
      '/',
      '/master',
      '/master/files',
      '/master/files/package.json',
      '/master/files/media',
      '/master/files/media/icon.png',
      '/master/commits',
      '/master/commits/62b950208d918925fda5204c435da0a2e14e540a',
      '/master/commits/62b950208d918925fda5204c435da0a2e14e540a/files',
      '/master/commits/62b950208d918925fda5204c435da0a2e14e540a/files/package.json'
    ];

    for (const url of urls200) {
      it('should respond 200 on ' + url, (done) => {
        chai.request(server)
          .get(url)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          });
      });
    }
  });

  describe('gh-pages branch', () => {
    const urls200 = [
      '/gh-pages',
      '/gh-pages/files',
      '/gh-pages/files/index.html',
      '/gh-pages/files/site-assets',
      '/gh-pages/files/site-assets/favicon.ico',
      '/gh-pages/commits',
      '/gh-pages/commits/5e69c95ef7d60d52a0d94819d7dcc542e7375fb0',
      '/gh-pages/commits/5e69c95ef7d60d52a0d94819d7dcc542e7375fb0/files',
      '/gh-pages/commits/5e69c95ef7d60d52a0d94819d7dcc542e7375fb0/files/index.html'
    ];

    for (const url of urls200) {
      it('should respond 200 on ' + url, (done) => {
        chai.request(server)
          .get(url)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
          });
      });
    }
  });
});
