import express from 'express';
import apiRouter from './routes/api';
import generateHealthReport from './utilities/health-tests';

const app = express();
const port = 3000;

app.use('/api', apiRouter);

// changed redirect and make it return json Object with status 200
app.get('/', (_req, res): void => {
  res
    .send(
      JSON.stringify({
        message: 'Hello From Image-processing-api root endpoint'
      })
    )
    .status(200)
    .end();
});

// endpoint always return 200 with health checks and return the api status and if all workingendpoint running good
app.get('/health', async (req, res) => {
  // this my own Test Lib for health and it work with objets can used by microservices before start work with compontent or report issues (THis Fetch Live Tests)

  const checkEndPointsHealth = await generateHealthReport(req);
  res.send(JSON.stringify(checkEndPointsHealth)).status(200).end();
});

app.listen(port, (): void => {
  console.log(`Server is Runing On: ${port}`);
});

export default app;
