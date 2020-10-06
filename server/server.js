import http from 'http';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const hostname = '127.0.0.1';
const port = 9001;
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

routes(app);


server.listen(
  port,
  hostname,
  () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  }
);