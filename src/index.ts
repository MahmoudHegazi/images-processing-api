import express from 'express';
import apiRouter from './routes/api';

const app = express();
const port = 3000;

app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.get('/health', (req, res) => {
  res.send({"health": "OK"}).status(200).end();
});
app.listen(port, () => {
  console.log(`Server is Runing On: ${port}`);
});

export default app;
