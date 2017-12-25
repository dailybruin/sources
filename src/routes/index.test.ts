import * as request from 'supertest';
import * as app from '../app';

describe('GET /random-url', () => {
  it('should return 404', done => {
    request(app)
      .get('/random-url')
      .expect(404, done);
  });
});

describe('GET /login', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/login')
      .expect(200);
  });
});
