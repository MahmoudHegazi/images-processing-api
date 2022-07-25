import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Image Processing API UNIT TEST', async () => {
  describe('root Endpoint:', async () => {
    it('should redirect to /api endpoint', async () => {
      const res = await request.get('/');
      expect(res.redirect).toBeTruthy();
    });
  });

  describe('API Endpoint: ', async () => {
    it('/api endpoint respond with 200 status and display valid response', async () => {
      const res = await request.get('/api');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        'Welcome To Image Processing API Options: [width, height, blur, rotate]'
      );
    });
  });
});
