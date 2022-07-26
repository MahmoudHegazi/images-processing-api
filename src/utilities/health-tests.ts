import express from 'express';
import fetch from 'node-fetch';

// this is real advanced function for live tests and health checks for microservices accurate results checks and it dynamic with good options fit needs
async function getEndPointPerformance<T>(
  req: express.Request,
  endpoint: string,
  status = 200,
  response: undefined | string | T = undefined
): Promise<boolean> {
  let stautsGood = false;
  let responseGood = false;
  try {
    let endPointRes;
    const endPointUrl = `${req.protocol}://${req.get('host')}${endpoint}`;
    console.log(`check health endpoint: ${endPointUrl}`);
    try {
      const rootRes = await fetch(endPointUrl);
      endPointRes = await rootRes.json();
      stautsGood = rootRes.status == status ? true : false;
    } catch {
      const rootRes = await fetch(endPointUrl);
      endPointRes = await rootRes.text();
      stautsGood = rootRes.status == status ? true : false;
    }

    if (response) {
      responseGood =
        JSON.stringify(endPointRes) == JSON.stringify(response) ? true : false;
    } else {
      responseGood = endPointRes ? true : false;
    }
    console.log(endPointRes.toString().slice(0, 150));

    return stautsGood && responseGood;
  } catch (error) {
    // if no json no text will raise here
    console.log(error);
    return false;
  }
}

type HealthReport = {
  testRoot: boolean;
  testAPiEP: boolean;
  testImagesEPFaluire: boolean;
  testImagesEPSuccess: boolean;
  healthy: boolean;
};

async function generateHealthReport(
  req: express.Request
): Promise<HealthReport> {
  const testRoot = await getEndPointPerformance<{ message: string }>(
    req,
    '/',
    200,
    { message: 'Hello From Image-processing-api root endpoint' }
  );
  const testAPiEP = await getEndPointPerformance(
    req,
    '/api/',
    200,
    'Welcome To Image Processing API Options: [width, height, blur, rotate]'
  );
  const testImagesEPFaluire = await getEndPointPerformance(
    req,
    '/api/images/',
    400,
    'one or more required parameters are missing: filename,width,height'
  );
  const testImagesEPSuccess = await getEndPointPerformance(
    req,
    '/api/images/?filename=dragon2&width=150&height=150',
    200
  );

  console.log(`Health Test /Root With JS OBJ endpoint: ${testRoot}`);
  console.log(`Health Test /API endpoint: ${testImagesEPFaluire}`);
  console.log(
    `Health Test /images endpoint with faluire for misssing requeired parm: ${testImagesEPFaluire}`
  );
  console.log(
    `Health Test /images endpoint with success only validate status: ${testImagesEPSuccess}`
  );
  // create health report (this make live tests to validate the status and response)
  return {
    testRoot,
    testAPiEP,
    testImagesEPFaluire,
    testImagesEPSuccess,
    healthy: testRoot && testAPiEP && testImagesEPFaluire && testImagesEPSuccess
  };
}
export default generateHealthReport;
