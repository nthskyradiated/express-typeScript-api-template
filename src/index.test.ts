import request from 'supertest';
import express from 'express';
import { errorHandler, notFound } from './middlewares/middlewares'; // adjust paths as necessary
import { getMetrics } from './routes/handlers'; // adjust paths as necessary

describe('Express API', () => {
  let app: express.Express;

  beforeEach(() => {

    app = express();
    
    // Set up routes and middleware
    app.use(express.json());
    app.get<{}, { message: string }>('/', (req, res) => {
      res.json({
        message: 'Green: API RootDir'
      }).end();
    });

    // Example route setup
    app.use('/metrics', getMetrics);

    // Middleware for 404 and error handling
    app.use(notFound);
    app.use(errorHandler);
  });

  it('should return a 200 OK for the root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Green: API RootDir');
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });

  it('should return a 200 OK for /metrics route', async () => {
    const response = await request(app).get('/metrics');
    expect(response.status).toBe(200);
  });

  // You can add more tests for other routes here...

  it('should listen on the correct port from the environment', () => {
    expect(process.env.PORT).toBe("8080");
  });

  it('should use the correct API directory path from environment variables', () => {
    expect(process.env.API_DIR_PATH).toBe('/api/routes');
  });
});
