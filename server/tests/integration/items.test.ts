import request from 'supertest';

// Ensure rate limits won't interfere with tests
process.env.RATE_LIMIT_MAX_TEST = '1000';
process.env.RATE_LIMIT_MAX_TEST_WRITE = '1000';

// Mock the ShoppingItem model to avoid real MongoDB operations in tests
jest.mock('../../src/models/ShoppingItem', () => {
  // A constructor function that assigns passed fields and provides a save() method
  const ShoppingItemMock: any = function (this: any, doc: any) {
    Object.assign(this, doc);
    this.save = jest.fn().mockResolvedValue(this);
    return this;
  };

  ShoppingItemMock.find = jest.fn().mockResolvedValue([]);
  ShoppingItemMock.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
  ShoppingItemMock.findByIdAndDelete = jest.fn().mockResolvedValue(null);
  ShoppingItemMock.deleteMany = jest.fn().mockResolvedValue(undefined);

  return ShoppingItemMock;
});

import app from '../../src/app';

describe('Items API (validation)', () => {
  it('returns 400 when creating an item without a name', async () => {
    const res = await request(app).post('/items').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(res.body).toHaveProperty('details');
    expect(res.body.details.name).toBeDefined();
  });

  it('accepts new canonical unit (slice)', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Bread', unit: 'slice', quantity: 2 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'slice');
  });

  it('accepts alias (gram) and normalizes to g', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Sugar', unit: 'gram', quantity: 100 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'g');
  });

  it('rejects unknown unit', async () => {
    const res = await request(app).post('/items').send({ name: 'Mystery', unit: 'weirdunit' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Validation failed');
    expect(res.body.details.unit).toBeDefined();
  });

  it('accepts canonical unit crate', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Bottles', unit: 'crate', quantity: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'crate');
  });

  it('accepts German alias "kiste" and normalizes to crate', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Beer', unit: 'kiste', quantity: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'crate');
  });

  it('accepts canonical unit bottle', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Olive oil', unit: 'bottle', quantity: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'bottle');
  });

  it('accepts German alias "flasche" and normalizes to bottle', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Soda', unit: 'flasche', quantity: 2 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'bottle');
  });

  it('accepts canonical unit can', async () => {
    const res = await request(app).post('/items').send({ name: 'Beans', unit: 'can', quantity: 3 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'can');
  });

  it('accepts German alias "dose" and normalizes to can', async () => {
    const res = await request(app).post('/items').send({ name: 'Tuna', unit: 'dose', quantity: 2 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'can');
  });

  it('accepts canonical unit pack', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Screws', unit: 'pack', quantity: 1 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'pack');
  });

  it('accepts German alias "packung" and normalizes to pack', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Cups', unit: 'packung', quantity: 2 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('unit', 'pack');
  });
});
