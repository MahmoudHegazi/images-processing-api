import supertest from 'supertest';
import app from '../../index';
import files from '../../utilities/files';
const request = supertest(app);


describe('Images Endpoint:', async ()=>{

  describe('MiddleWare 1: Validation', async ()=>{
    it('throw error 400 if one of required parameters like filename are not provided', async()=>{
      const res = await request.get('/api/images?encenadaport.jpg&width=150&');
      expect(res.body).toEqual("one or more required parameters are missing: filename,height");
      expect(res.status).toBe(400);
    });
  });

  describe('MiddleWare 2: Types and Optional Parameter validator', async ()=>{
    describe('Types Check Only: ', async()=>{
      it('using invalid parameters will return 400 error with message to describe which types are invalid', async()=>{
        // this for both required and optional [incase using optional user must enter valid value for the parameter or display error] [maybe image be 1.png no need check filename]
        const res = await request.get('/api/images?filename=encenadaport&width=hi&height=wrong&blur=hey&rotate=180');
        expect(res.status).toBe(400);
        expect(res.body).toEqual("one or more parameters have invalid types: width: number,height: number,blur: number");
      });
    });

    describe('Optional Parameters', async()=>{
      it('confirm not using optional parameters will not lead to errors',async()=>{
        const res = await request.get('/api/images?filename=encenadaport&height=120&width=120');
        expect(res.status).toBe(200);
      })
    })
  });

  describe('MiddleWare 3: Validate File exist in Full Folder', async ()=>{
    it('should throw 404 error if filename not found in cached first or in full folder', async()=>{
      const res = await request.get('/api/images?filename=hello&width=150&height=150');
      expect(res.status).toBe(404);
    });
  });

  describe('MiddleWare 4: Processing Image', async ()=>{
    it('confirm creating new image will created new file thumb dir with the query parameters and endpoint responds with 200', async()=>{
      const res = await request.get('/api/images?filename=fjord.jpg&width=150&height=150&blur=1&rotate=180');
      const isExpectedFileExist = await files.isFileExist('images/thumb/fjord_150_150_1_180.jpg'); // confirm the expected file exist in thumb dir
      expect(isExpectedFileExist).toBeTruthy();
      expect(res.status).toBe(200);
    });
  });

  describe('Callback: Test Success Response with new resized image', async ()=>{
    it('confirm that requesting new image return valid response with status 200', async()=>{
      const res = await request.get('/api/images?filename=encenadaport&width=193&height=170&blur=0&rotate=180');
      expect(res.status).toBe(200);
    });
  });
});
