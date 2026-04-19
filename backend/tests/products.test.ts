import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Products API', () => {
  it('✅ GET /api/products trả về danh sách sản phẩm và facets', async () => {
    const res = await request(app).get('/api/products?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.facets).toBeDefined();
    expect(res.body.total).toBeDefined();
  });

  it('✅ GET /api/categories trả về danh sách danh mục', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
