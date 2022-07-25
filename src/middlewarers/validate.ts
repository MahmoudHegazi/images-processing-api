import express from 'express';

interface imageParms {
  filename: string;
  width: number | string;
  height: number | string;
}

// page have type return
// Middleware 1
// this middle ware to validate the required parameters
const required_validator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const missingParms: string[] = [];
  let error: boolean = false;
  const parms: imageParms = {
    filename: req.query.filename as unknown as string,
    width: req.query.width as unknown as number,
    height: req.query.height as unknown as number
  };
  // add all the undefined query parameters name to missingParms list
  for (const parm in parms) {
    const parmValue = parms[parm as keyof imageParms] as unknown;
    if (!parmValue) {
      error = true;
      missingParms.push(parm);
    }
  }
  if (error) {
    //res.send(`one or more required parameters are missing: ${missingParms.join(",")}`).status(400).end();
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(
      JSON.stringify(
        `one or more required parameters are missing: ${missingParms.join(',')}`
      )
    );
  } else {
    next();
  }
};

// Middleware 2 (Run after middleware 1) (validaite type s of query parameters filename is string and size parms are numbers)
const type_validator = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const invalidTypes: string[] = [];
  let error: boolean = false;
  const filename = ((typeof req.query.filename as unknown as string) ===
    'string') as boolean;
  const valid_width = !isNaN(
    parseInt(req.query.width as unknown as string)
  ) as boolean;
  const valid_height = !isNaN(
    parseInt(req.query.height as unknown as string)
  ) as boolean;
  //var re2 = new RegExp('/^f/');
  //var r  = 'file'.match(re2);
  if (!filename) {
    invalidTypes.push('filename: string');
    error = true;
  }

  if (!valid_width) {
    invalidTypes.push('width: number');
    error = true;
  }
  if (!valid_height) {
    invalidTypes.push('height: number');
    error = true;
  }

  // add any new optional or required params and check them is easy
  // check optional params
  if (req.query.blur) {
    const blurCHeck = !isNaN(
      parseInt((req.query.blur as unknown as string).trim())
    ) as boolean;
    if (!blurCHeck) {
      invalidTypes.push('blur: number');
      error = true;
    } else {
      // save the value of blur in locals
      res.locals.blur = Math.round(
        parseInt((req.query.blur as unknown as string).trim())
      );
    }
  }
  // check optional params (Only allow true in rotate)
  if (req.query.rotate) {
    const rotateCheck = !isNaN(
      parseInt((req.query.rotate as unknown as string).trim())
    ) as boolean;
    if (!rotateCheck) {
      invalidTypes.push('rotate: number');
      error = true;
    } else {
      res.locals.rotate = Math.round(
        parseInt((req.query.rotate as unknown as string).trim())
      );
    }
  }

  if (error) {
    //res.send(`one or more parameters have invalid types: ${invalidTypes.join(",")}`);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.end(
      JSON.stringify(
        `one or more parameters have invalid types: ${invalidTypes.join(',')}`
      )
    );
  } else {
    next();
  }
};

export default { required_validator, type_validator };
