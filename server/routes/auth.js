import { Router } from 'express';
import cors from 'cors';
import multer from 'multer';
import { createUser, findUser, checkToken } from '../server/controllers/user.controller';

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

const router = Router();

router.post(
  '/registration',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'userData', maxCount: 1 },
  ]),
  createUser,
);

router.post(
  '/login',
  findUser,
);

router.get(
  '/checkToken',
  checkToken,
);

export default router;