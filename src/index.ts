import express from 'express';
import apiRouter from './routes/api';

const app = express();
const port: number = 3000;

app.use('/api', apiRouter);

app.get('/',(req, res)=>{
  res.redirect('/api');
});


app.listen(port, ()=>{
  console.log(`Server is Runing On: ${port}`);
});


export default app;
