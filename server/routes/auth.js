import { Router } from 'express';
import multer from 'multer';
import { createUser, login, logout, checkToken } from '../server/controllers/user.controller';

let storageConfig = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../client/uploads');
  },
  filename: function (req, file, callback) {
    const name = 'image-' + Date.now();
    req.suffix = name;
    callback(null, name);
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
  login,
);

router.get(
  '/logout',
  logout,
);

router.get(
  '/checkToken',
  checkToken,
);

export default router;