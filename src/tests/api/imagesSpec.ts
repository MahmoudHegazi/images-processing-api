import supertest from 'supertest';
import app from '../../index';
const request = supertest(app);


describe('Images Endpoint:', async ()=>{
  describe('upload image and resize it without cache:', async ()=>{
    it('images processsing end and api respond with status 200', async()=>{
      const res = await request.get('/images?filename=encenadaport.jpg&width=150&height=150');
      expect(res.status).toBe(200);
    });

    it('throw error 400 if filename, size and width are not provided', async()=>{
      const res = await request.get('/images?encenadaport.jpg&width=150&height=150');
      expect(res.status).toBe(400);
    });
  });

  describe('serve image cached images:', async ()=>{
  });
});
