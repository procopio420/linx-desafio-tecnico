const request = require('supertest');
const { app } = require('../src/express');

describe('Test for the 10 minutes cache', () => {
  test('It should response the POST method', async () => {
    const response = await request(app)
      .post('/products')
      .send([{ id: '123', name: 'mesa' }]);
    expect(response.status).toBe(200);
  });
});
