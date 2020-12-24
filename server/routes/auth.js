import { Router } from 'express';
import testUsers from '../testData/testUsers';
import cors from 'cors';
import multer from 'multer';
import { createUser } from '../server/controllers/user.controller';

const suffix = 'image-' +  Date.now();

let storageConfig = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../client/uploads');
  },
  filename: function (req, file, callback) {
    req.suffix = suffix;
    callback(null, suffix);
  }
});

let upload = multer({
  storage: storageConfig
});

const corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = Router();

router.post(
  '/registration',
  cors(corsOptions),
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'userData', maxCount: 1 },
  ]),
  createUser,
);

router.post(
  '/login',
  cors(corsOptions),
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    const { body } = req;
    let userData = null;
    testUsers.forEach(
      (item, index) => {
        if (
          body.login === item.login &&
          body.password === item.password
        ) {
          userData = testUsers[index];
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