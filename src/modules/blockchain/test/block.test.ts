import { getApp } from 'app';
import * as supertest from 'supertest';
const request = require('supertest');

describe('blockchain » block', () => {
  it('Last height work', async () => {
    const app = await getApp(true);
    await request(app)
      .get('/block/height')
      .send()
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.height).toBeGreaterThanOrEqual(16755625);
      });
  });

  it('Get Block works', async () => {
    const app = await getApp(true);
    await request(app)
      .get('/block/16755625')
      .send()
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.timestamp.timestamp).toBe(1677939551);
        expect(body.timestamp.humanReadableDate).toBe('2023-03-04T14:19:11.000Z');
        expect(body.height).toBe('16755625');
        expect(body.rawBlock.number).toBe(16755625);
      });
  });

  it('Get Invalid Block', async () => {
    const app = await getApp(true);
    await request(app)
      .get('/block/invalid')
      .send()
      .expect(400)
      .then(async (response: supertest.Response) => {
        const body: { code: number; message: string } = JSON.parse(response.text);
        expect(body.code).toBe(400);
        expect(body.message).toBe('Error: invalid Block.');
      });
  });

  it('Get Invalid Block number negative', async () => {
    const app = await getApp(true);
    await request(app)
      .get('/block/-1')
      .send()
      .expect(400)
      .then(async (response: supertest.Response) => {
        const body: { code: number; message: string } = JSON.parse(response.text);
        expect(body.code).toBe(400);
        expect(body.message).toBe('Error: invalid Block.');
      });
  });

  it('Get Invalid Block number too big', async () => {
    const app = await getApp(true);
    await request(app)
      .get('/block/1677944140')
      .send()
      .expect(400)
      .then(async (response: supertest.Response) => {
        const body: { code: number; message: string } = JSON.parse(response.text);
        expect(body.code).toBe(400);
        expect(body.message).toBe('Error: invalid Block.');
      });
  });

  it('Get Block timestamp works', async () => {
    const app = await getApp(true);
    await request(app)
      .get('/block/16755625/time')
      .send()
      .expect(200)
      .then(async (response: supertest.Response) => {
        const body = JSON.parse(response.text);
        expect(body.timestamp).toBe(1677939551);
        expect(body.humanReadableDate).toBe('2023-03-04T14:19:11.000Z');
      });
  });

  it('trying without timestamp', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({})
      .expect(400)
      .then(async (response: supertest.Response) => {
        const body: { code: number; message: string } = JSON.parse(response.text);
        expect(body.code).toBe(400);
        expect(body.message).toBe('Error: timestamp is required.');
      });
  });

  it('trying with wrong method', async () => {
    const app = await getApp(true);
    await request(app)
      .post('/block/by-timestamp')
      .send({ timestamp: 2, method: 'yolo' })
      .expect(400)
      .then(async (response: supertest.Response) => {
        const body: { code: number; message: string } = JSON.parse(response.text);
        expect(body.code).toBe(400);
        expect(body.message).toBe('Error: method must be either BINARY_SEARCH or AVG_BLOCK_TIME.');
      });
  });
});
