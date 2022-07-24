import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Image Processing API UNIT TEST', async ()=>{

  describe('root Endpoint:', async ()=>{
    it('should redirect to /api endpoint');
  });

  describe('API Endpoint: ', async ()=>{
    it('/api endpoint respond with 200 status and display valid response', async ()=> {
      const res = await request.get('/api');
      expect(res.status).toBe(200);
      expect(res.body).toBe(`Image processing API to resize and host your images in one place You can
        Resize/view your Images Via: api/images?filename=[Enter image name]&width=
        [image new width]&height=[image new height]&blur=[number for blur]&rotate[yes or false]
        you can later view the processed images
      `);
    });
  });

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
});
