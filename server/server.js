import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes';
import cors from 'cors';
import http from 'http';
import db from './server/models/index.js';
import path from 'path';

const app = express();
const port = 9001;
const server = http.createServer(app);
const hostname = server.address();

const corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

db.sequelize.sync().then(result => {
  console.log(' ');
  console.log('Sync success ::');
})
.catch(err=> console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './public')));

app.use(cors({origin: true}));
app.options('*');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


routes(app);

// app.post(
//   '/reg',
//   cors(corsOptions),
//   (req, res) => {
//     const userData = JSON.parse(req.body.userData);
//     console.log(' ');
//     console.log('reg.files ::', req.files);
//     console.log(' ');
//     console.log('reg.files[userData] ::', req.files['userData']);
//     console.log(' ');
//     console.log('reg.file ::', req.files['file'][0]);
//     console.log(' ');
//     console.log('req.body.userData ::', req.body.userData);
//     console.log(' ');
//     console.log('userData.email ::', userData.description);
//     // for (let key in yourobject) {
//     //   console.log(key, yourobject[key]);
//     // }
//     console.log(' ');
//     return true;
//   }
// );


app.listen(
  port,
  server.address(),
  () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  }
);