import express from 'express';
import files from '../utilities/files';
import sharp from 'sharp';

const process_image = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> =>{
  const filename = (req.query.filename as unknown) as string;
  // direct get typed number parameter
  const width = (parseInt(req.query.width as string) as unknown) as number;
  const height = (parseInt(req.query.height as string) as unknown) as number;
  if (res.locals.cached){ // incase image was cached ignore this middleware (performance blockchain middlewares)
    next();
  } else {
    try {
      const resiezedf = sharp(res.locals.imageFullPath).resize(width, height);
      // apply blur if any (It valid number checked)
      if (res.locals.blur){
        resiezedf.blur(res.locals.blur);
      }
      if (res.locals.rotate){
        resiezedf.rotate(res.locals.rotate);
      }

      const buffer = await resiezedf.toBuffer();
      const fileext = res.locals.imageFullPath.split('.')[res.locals.imageFullPath.split('.').length-1];
      // genrate the new thumb filename passed on all parameters required and optional Make sure to call this function with this order
      const newFilePath = files.getThumbFilePath(fileext, filename, width, height, res.locals.blur, res.locals.rotate);
      //const newImagePath = path.resolve(newFilename);
      const newProcessedImage = await files.createNewFile(newFilePath, buffer);
      res.locals.processd_image = newFilePath;
      next();
    } catch (err) {
      console.log(err);
      res.send('unexpected error occured while processing file').status(422).end();
      return;
    }
  }
};

export default process_image;
