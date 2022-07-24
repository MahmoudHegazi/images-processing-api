import {Router} from 'express';
import imagesRouter from './api/images';

const apiRouter = Router();
apiRouter.use('/images', imagesRouter);

apiRouter.get('/', (req, res)=>{
  res.send
  (`Image processing API to resize and host your images in one place You can
    Resize/view your Images Via: api/images?filename=[Enter image name]&width=
    [image new width]&height=[image new height]&blur=[number for blur]&rotate[yes or false] you can later view the processed images
  `);
})

export default apiRouter;
