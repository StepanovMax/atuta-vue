import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes';
import cors from 'cors';
import http from 'http';
import db from './server/models/index.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config({
  path: `env/.env.${process.env.NODE_ENV}`
});

console.log(' ');
console.log('   >> process.env.mailinblue_key 1: ', process.env.mailinblue_key);
console.log('  ');

console.log('process.env.host_api ::', process.env.host_api);
console.log('process.env.host_front ::', process.env.host_front);

const app = express();
const port = 9001;
const server = http.createServer(app);
// const hostname = server.address();

const corsOptions = {
  // origin: true,
  origin: process.env.host_front,
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

db.sequelize
  .sync()
    .then(result => {
      console.log(' ');
      console.log('   >> DB synchronization success!');
      console.log(' ');
    })
      .catch(err=> console.log(err));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './public')));

app.use(cors(corsOptions));
app.options('*');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


routes(app);

app.listen(
  port,
  server.address(),
  () => {
    console.log(' ');
    console.log(`   >> Server running at port ${port}.`);
    console.log(' ');
  }
);