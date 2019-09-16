const request = require('supertest');
const api = require('../server.js');

let session1;
let session2;

describe('POST /register', function() {
  test('return 400 if no username', (done) => {
    let credentials = {
      password: `password`,
    };
    request(api)
      .post('/register')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('return 400 if no password', (done) => {
    let credentials = {
      username: `testAccount1`,
    };
    request(api)
      .post('/register')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('return 201 if successful', (done) => {
    let credentials = {
      username: `testAccount1`,
      password: `password`,
    };
    request(api)
      .post('/register')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('return 500 if username is not unique', (done) => {
    let credentials = {
      username: `testAccount1`,
      password: `password`,
    };
    request(api)
      .post('/register')
      .send(credentials)
      .expect(500)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('return 201 if successful after a failure', (done) => {
    let credentials = {
      username: `testAccount2`,
      password: `password`,
    };
    request(api)
      .post('/register')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /login', function() {
  test('return 400 if no username', (done) => {
    let credentials = {
      password: `password`,
    };
    request(api)
      .post('/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('return 400 if no password', (done) => {
    let credentials = {
      username: `testAccount1`,
    };
    request(api)
      .post('/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('return 401 if incorrect username', (done) => {
    let credentials = {
      username: `bestAccount1`,
      password: `password`,
    };
    request(api)
      .post('/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('return 401 if incorrect password', (done) => {
    let credentials = {
      username: `testAccount1`,
      password: `something_something`,
    };
    request(api)
      .post('/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(401)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('return 200 with session if successful', (done) => {
    let credentials = {
      username: `testAccount1`,
      password: `password`,
    };
    request(api)
      .post('/login')
      .send(credentials)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /logout', function() {
  beforeEach((done) => {
    request(api)
      .post('/login')
      .send({
        username: `testAccount1`,
        password: `password`,
      })
      .end(function(err, res) {
        if (err) return done(err);
        session1 = res.body.session;
        done();
      });
  });
  test('returns 200 and json if successful', (done) => {
    request(api)
      .post('/logout')
      .send({ session: session1 })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('returns 400 and json if session has already ended', (done) => {
    request(api)
      .post('/logout')
      .send({ session: session1 })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /verify', function() {
  beforeEach((done) => {
    request(api)
      .post('/login')
      .send({
        username: `testAccount1`,
        password: `password`,
      })
      .end(function(err, res) {
        if (err) return done(err);
        session1 = res.body.session;
        done();
      });
    request(api)
      .post('/login')
      .send({
        username: `testAccount2`,
        password: `password`,
      })
      .end(function(err, res) {
        if (err) return done(err);
        session2 = res.body.session;
        done();
      });
    request(api)
      .post('/logout')
      .send({ session: session1 })
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('returns 400 and json if invalid session', (done) => {
    request(api)
      .post('/verify')
      .send({ session: session1 })
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
  test('returns 200 and json if valid session', (done) => {
    request(api)
      .post('/verify')
      .send({ session: session2 })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
});
