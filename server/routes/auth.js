import { Router } from 'express';
import multer from 'multer';
import {
  registration, 
  login,
  logout,
  checkToken,
  verifyRegistrationLink,
  removeUser,
  getUserCurrent,
} from '../server/controllers/user.controller';

import verifyRecoverPasswordLink from '../server/controllers/user/verifyRecoverPasswordLink';
import recoverPassword from '../server/controllers/user/recoverPassword';
import changePassword from '../server/controllers/user/changePassword';

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

// console.log(' text __', typeof verifyRecoverPasswordLink);

router.get(
  '/verifyRecover/:userId/:secretCode',
  verifyRecoverPasswordLink
);

router.post(
  '/recoverPassword',
  recoverPassword,
);

router.post(
  '/changePassword',
  changePassword
);

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

router.get(
  '/getUser',
  getUserCurrent,
);


export default router;