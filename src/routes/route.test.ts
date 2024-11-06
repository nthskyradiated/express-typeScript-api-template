import request from 'supertest';
import express from 'express';
import { Models } from '../models/Model';
import routes from './route'
import { errorHandler, notFound } from '../middlewares/middlewares';
let app: express.Express;
let id = ''; // For storing the inserted ID

beforeEach(() => {
  app = express();
  app.use(express.json());
  app.use('/api/routes', routes)
  app.use(notFound);
  app.use(errorHandler);
});

beforeAll(async () => {
  try {
    await Models.drop(); // Clean up the database before tests
  } catch (error) {
    console.error('Error cleaning database:', error);
  }
});

// Test GET /api/routes
describe('GET /api/routes', () => {
  it('responds with an array of objects', async () =>
    request(app)
      .get('/api/routes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBeGreaterThanOrEqual(0);
      })
  );
});

// Test POST /api/routes
describe('POST /api/routes', () => {
  it('responds with an error if the entry is invalid', async () =>
    request(app)
      .post('/api/routes')
      .set('Accept', 'application/json')
      .send({
        Name: '', // Invalid content
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      })
  );

  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/routes')
      .set('Accept', 'application/json')
      .send({
        Name: 'item 1',
        ItemNumber: 1,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id; // Save ID for later use
        expect(response.body).toHaveProperty('Name');
        expect(response.body.Name).toBe('item 1');
        expect(response.body).toHaveProperty('ItemNumber');
      })
  );
});

// Test GET /api/routes/:id
describe('GET /api/routes/:id', () => {
  it('responds with a single object', async () =>
    request(app)
      .get(`/api/routes/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('Name');
        expect(response.body.Name).toBe('item 1');
        expect(response.body).toHaveProperty('ItemNumber');
      })
  );

  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/routes/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .get('/api/routes/6306d061477bdb46f9c57fa4') // Example non-existent ID
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

// Test PUT /api/routes/:id
describe('PUT /api/routes/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/routes/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/routes/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .send({
        Name: 'item 1',
        ItemNumber: 1,
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('responds with a single updated object', async () =>
    request(app)
      .put(`/api/routes/${id}`)
      .set('Accept', 'application/json')
      .send({
        Name: 'item 1',
        ItemNumber: 2,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('Name');
        expect(response.body.Name).toBe('item 1');
        expect(response.body).toHaveProperty('ItemNumber');
        expect(response.body.ItemNumber).toBe(2);
      })
  );
});

// Test DELETE /api/routes/:id
describe('DELETE /api/routes/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/routes/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/routes/6306d061477bdb46f9c57fa4')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('responds with a 204 status code', (done) => {
    request(app)
      .delete(`/api/routes/${id}`)
      .set('Accept', 'application/json')
      .expect(204, done);
  });

  it('responds with a not found error after deletion', (done) => {
    request(app)
      .get(`/api/routes/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});
