import { Router } from 'express';
import testUsers from '../testData/testUsers';
import cors from 'cors';
// import multer from 'multer';
import { createUser } from '../server/controllers/user.controller';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   }
// });

const corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = Router();

console.log(' ');
console.log('registration ::');

router.post('/registration', createUser);

router.post(
  '/login',
  cors(corsOptions),
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    let userData = null;
    testUsers.forEach(
      (item, index) => {
        if (
          body.login === item.login &&
          body.password === item.password
        ) {
          userData = testUsers[index];
          console.log('userData', userData);
        }
      }
    )
    if (userData) {
      res.status(200).send(userData);
    } else {
      res.status(404).send(false);
    }
  }
);

export default router;