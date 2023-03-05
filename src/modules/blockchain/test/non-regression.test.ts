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
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(14430430);
      });
  });

  it('Get block by avg for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1647875361, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(14430430);
      });
  });

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1677952092 })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(16756658);
      });
  });

  it('Get block by avg for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1677952092, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(16756658);
      });
  });

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1677952992 })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(16756732);
      });
  });

  it('Get block by avg for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1677952992, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(16756732);
      });
  });

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1677952100 })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(16756658);
      });
  });

  it('Get block by avg for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1677952100, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(16756658);
      });
  });

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1544787533 })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(6884853);
      });
  });

  it('Get block by avg for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1544787533, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(6884853);
      });
  });

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1644087533 })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(14147743);
      });
  });

  it('Get block by avg for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1644087533, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(14147743);
      });
  });

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1677946537 })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(16756199);
      });
  });

  it('Get block by avg for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1677946537, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(16756199);
      });
  });

  it('Get block by bisect for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1624087533 })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(12663473);
      });
  });

  it('Get block by avg for ts ', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 1624087533, method: 'AVG_BLOCK_TIME' })
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.block.height).toBe(12663473);
      });
  });
});
