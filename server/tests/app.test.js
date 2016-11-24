import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## App', () => {
  
  describe('# GET /api/health-check', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/api/health-check')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/404', () => {
    it('should return 404 status', (done) => {
      request(app)
        .get('/api/404')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/exchangerate' , () => {
    
    let to = 'BRL';
    let from = 'USD'; 
    
    it('pass a valid (to) and (from) values, should return exchange rate json', (done) => {
      request(app)
        .get(`/api/exchangerate?to=${to}&from=${from}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.to).to.equal(to);
          expect(res.body.from).to.equal(from);
          expect(res.body.data).to.be.instanceof(Array).to.not.empty;
          done();
        })
        .catch(done);
    });

    it('should report error with invalid to', (done) => {
      request(app)
        .get(`/api/exchangerate?to=INVALID&from=${from}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message);
          done();
        })
        .catch(done);
    });

    it('should report error with invalid from', (done) => {
      request(app)
        .get(`/api/exchangerate?to=${to}&from=INVALID`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message);
          done();
        })
        .catch(done);
    });
  });

});
