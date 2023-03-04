import { getApp } from 'app';
import * as supertest from 'supertest';
const request = require('supertest');

describe('blockchain » block » non-regress', () => {
  jest.setTimeout(10000);

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1647875361 })
      .expect(200)
      .then(async (response: supertest.Response) => {
        console.log(response.text);
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(14430430);
      });
  });

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1647875361, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        console.log(response.text);
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(14430430);
      });
  });
});
