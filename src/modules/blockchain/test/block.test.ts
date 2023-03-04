import { getApp } from '../../../server';
const request = require('supertest');

describe('blockchain » block', () => {
  it('Last height work', async () => {
    const app = await getApp();
    const req = await request(app).get('/block/height');
    expect(req.statusCode).toBe(200);
    const body = JSON.parse(req.text);
    expect(body.height).toBeGreaterThanOrEqual(16755625);
  });

  it('Get Block works', async () => {
    const app = await getApp();
    const req = await request(app).get('/block/16755625');
    expect(req.statusCode).toBe(200);
    const body = JSON.parse(req.text);
    expect(body.timestamp.timestamp).toBe(1677939551);
    expect(body.timestamp.humanReadableDate).toBe('2023-03-04T14:19:11.000Z');
    expect(body.height).toBe('16755625');
    expect(body.rawBlock.number).toBe(16755625);
  });

  it('Get Block timestamp works', async () => {
    const app = await getApp();
    const req = await request(app).get('/block/16755625/time');

    expect(req.statusCode).toBe(200);
    const body = JSON.parse(req.text);
    expect(body.timestamp).toBe(1677939551);
    expect(body.humanReadableDate).toBe('2023-03-04T14:19:11.000Z');
  });
});
