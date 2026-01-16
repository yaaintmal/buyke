// set test-specific rate limit before importing app
process.env.NODE_ENV = 'test';
process.env.RATE_LIMIT_MAX_TEST = '3';

import request from 'supertest';
import app from '../../src/app';

describe('Rate limiting on /items', () => {
  it('returns 429 after exceeding the general rate limit', async () => {
    // make requests up to the limit
    for (let i = 0; i < 3; i++) {
      const res = await request(app).get('/items/__ping');
      expect(res.status).toBe(200);
    }

    // the next request should receive 429
    const res = await request(app).get('/items/__ping');
    expect(res.status).toBe(429);
    expect(res.body).toHaveProperty('error');
  });
});
