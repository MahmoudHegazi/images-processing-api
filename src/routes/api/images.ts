import validate from '../../middlewarers/validate';
import {Router} from 'express';
import file_validate from '../../middlewarers/file_validate';
import process_image from '../../middlewarers/image_processer';
const imageRouter = Router();

/* This is final step reached with any error handled in middlewares */

// this to validate the required query parameters are exist and types of each one and return error for each parm has issue
imageRouter.use([validate.required_validator, validate.type_validator]);

// check if file cached first set locals cache first and set local cache and stop other midlewares, if not cached check file in full folder validtion to start processing
imageRouter.use(file_validate.validate_cachedFile, file_validate.validate_file_existince);


// use the process_image midle ware to create new images and set res.locals.processd_image or end the request incase of errors blockchain small
imageRouter.use(process_image);

// this callback is finall one error free (res.locals.cached means the image already exist) (res.locals.processd_image: new image created)
imageRouter.get('/', async (req, res)=>{
  if (res.locals.cached){
     console.log('cached First');
     res.sendFile(res.locals.imageThumbPath);
   } else {
     console.log('new Resized Image:');
     res.sendFile(res.locals.processd_image);
   }
});


export default imageRouter;
