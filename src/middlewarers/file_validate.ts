import express from 'express';
import files from '../utilities/files';


const validate_cachedFile = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> =>{
  let strName: string = ((req.query.filename as unknown) as string).trim().toLowerCase();
  let strWidth: string = ((req.query.width as unknown) as string).trim().toLowerCase();
  let strHeight: string = ((req.query.height as unknown) as string).trim().toLowerCase();
  // create name first with required parms
  let cached_name: string = `${strName}_${strWidth}_${strHeight}`;

  // add the optional params to name if set in previous middleware (same order when called getThumbFilePath )
  if (res.locals.blur){
    // note 0 is false so blur=0 in url equal to no blur added and image name will have no blur
    cached_name += '_' + String(res.locals.blur);
  }

  if (res.locals.rotate){
    cached_name += '_' + String(res.locals.rotate);
  }

  const fileCached = await files.getFileByName('images/thumb', cached_name);

  // this just fast check for existing before it not shuold return errors
  if (fileCached){
    res.locals.cached = true;
    res.locals.imageThumbPath = fileCached;
    console.log('Middleware 3 check in thumb', fileCached);
  }
  next();
};

// Files Middleware 3 [this midleware to check if the filename exist in full folder or not ] This consider last layer before processing file
const validate_file_existince = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> =>{
  if (res.locals.cached){
    // if image cached move to callback
    next();
  } else {
    // getFileByName: if there are image file in full folder same like filename will return filepath else return false
    const fileExistInFull = await files.getFileByName('images/full', (req.query.filename as unknown) as string);
    //const fileExistInFull = await files.getFileByName('images/thumb', (req.query.filename as unknown) as string);
    if (fileExistInFull){
      res.locals.cached = false;
      res.locals.imageFullPath = fileExistInFull;
      console.log('Midle ware 4 Chick In Full', fileExistInFull);
      next();
    } else {
      res.send('can not find file in full folders / thumb folders ').status(404).end();
      return;
    }
  }

};

export default {validate_cachedFile, validate_file_existince};
