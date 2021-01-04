import express from 'express';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger';
import userRouter from './routes/user';
import WrestleRouter from './routes/wrestles';

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-Width,Content-Type,Accept,auth-token');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,PATCH,DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/swaggerDocument/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to todo app backend',
  });
});
app.use('/api/v1/todo/', userRouter);
app.use('/api/v1/todo/', WrestleRouter);

app.use((req, res) => {
  res.status(404).json({
    Error: 'invalid url',
  });
});
const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log(`app is listen to port ${port}`);
});
export default app;
