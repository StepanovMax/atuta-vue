import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes';
import cors from 'cors';
import http from 'http';


const app = express();
const port = 9001;
const server = http.createServer(app);
const hostname = server.address();


app.use(cors({origin: true}));
app.options('*');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


routes(app);


app.get(
  '/',
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({
      message: 'Хей-хей ?!'
    });
  }
);


app.listen(
  port,
  server.address(),
  () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  }
);