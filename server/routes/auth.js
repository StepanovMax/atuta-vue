import { Router } from 'express';
import multer from 'multer';
import { registration, login, logout, checkToken, verifyRegistrationLink, removeUser } from '../server/controllers/user.controller';

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
  registration,
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

router.get(
  '/verify/:userId/:secretCode',
  verifyRegistrationLink,
);

router.get(
  '/removeUser',
  removeUser,
);


export default router;