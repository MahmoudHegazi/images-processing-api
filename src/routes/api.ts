import { Router } from 'express';
import imagesRouter from './api/images';

const apiRouter = Router();
apiRouter.use('/images', imagesRouter);

// workign endpoint (this always return 200)
apiRouter.get('/', (_req, res): void => {
  res.setHeader('Content-Type', 'application/json');
  res
    .send(
      JSON.stringify(
        'Welcome To Image Processing API Options: [width, height, blur, rotate]'
      )
    )
    .status(200)
    .end();
});

export default apiRouter;
