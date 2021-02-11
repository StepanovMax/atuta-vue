import { Router } from 'express';
import multer from 'multer';
import { updateUser } from '../server/controllers/user.controller';

const storageConfig = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../client/uploads');
  },
  filename: function (req, file, callback) {
    console.log(' ');
    console.log('  storageConfig ::');
    console.log(' ');
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
  '/edit',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'userData', maxCount: 1 },
  ]),
  updateUser,
);

export default router;