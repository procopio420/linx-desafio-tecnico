const request = require('supertest');
const app = require('../src/app');

describe('Test for the 10 minutes cache', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  test('It should response the POST method', async () => {
    const response = await request(app)
      .post('/products')
      .send({ id: 123, name: 'mesa' });
      console.log(response.body)
    expect(response.status).toBe(200);
  });
});
