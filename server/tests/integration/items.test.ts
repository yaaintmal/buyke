import request from 'supertest';
import app from '../../src/app';

describe('Items API (validation)', () => {
  it('returns 400 when creating an item without a name', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(res.body).toHaveProperty('details');
    expect(res.body.details.name).toBeDefined();
  });
});
