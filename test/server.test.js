import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from '../server.js';

describe('server', () => {
  it('GET / responds with 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});
