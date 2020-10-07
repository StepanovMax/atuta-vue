import http from 'http';
import { Router } from 'express';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const hostname = '127.0.0.1';
const port = 9001;
const app = express();
const server = http.createServer(app);

app.use(cors({origin: true}));
app.options('*', cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = Router();

routes(app);


// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   console.log('test');
//   next();
// });

router.get(
  '/',
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({
      message: 'Хей-хей ?!'
    });
  }
);


server.listen(
  port,
  hostname,
  () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  }
);