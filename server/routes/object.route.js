import { Router } from 'express';
import multer from 'multer';
import { create } from '../server/controllers/object.controller';

let storageConfig = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../client/uploads');
  },
  filename: function (req, file, callback) {
    console.log(' ');
    console.log('  storageConfig ::');
    console.log(' ');
    const name = 'object-' + Date.now();
    req.suffix = name;
    callback(null, name);
  }
});

let upload = multer({
  storage: storageConfig
});

const router = Router();


router.post(
  '/create',
  upload.fields([
    { name: 'file', maxCount: 10 },
    { name: 'object', maxCount: 1 },
  ]),
  create,
);


export default router;