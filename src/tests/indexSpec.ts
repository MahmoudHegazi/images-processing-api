import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
//supertest.agent(app.listen(3001, ()=>{console.log('try this')}));

describe('Image Processing API UNIT TEST', (): void => {
  console.log('hi');
  describe('root Endpoint:', (): void => {
    it('should respond with status 200 as root endpoint', async (): Promise<void> => {
      const res = await request.get('/');
      expect(res.status).toBe(200);
    });
  });

  describe('API Endpoint: ', () => {
    it('/api endpoint respond with 200 status and display valid response', async (): Promise<void> => {
      const res = await request.get('/api');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(
        'Welcome To Image Processing API Options: [width, height, blur, rotate]'
      );
    });
  });
});
