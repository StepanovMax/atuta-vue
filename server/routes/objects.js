import { Router } from 'express';
import multer from 'multer';
import testObjects from '../testData/testObjects';

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
  '/create',
  (req, res) => {
    const { object } = req.body;
    console.log(' ');
    console.log('  >> Object');
    console.log(object);
    console.log(' ');

    res.status(200).send(true);
  }
);


router.get(
  '/get-objects',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (testObjects) {
      res.status(200).send(testObjects);
    } else {
      res.status(404).send({
        message: 'Object not found'
      });
    }
  }
);

router.post(
  '/get-object-by-id',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    const objectID = parseInt(body.id);
    let object;
    testObjects.map(
      item => {
        if (item.id === objectID) {
          object = item;
        }
      }
    );
    if (object) {
      res.status(200).send(object);
    } else {
      res.status(404).send({
        message: 'Object not found'
      });
    }
  }
);

router.post(
  '/get-objects-by-parent-id',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    const parentID = parseInt(body.id);
    let objects = [];
    testObjects.map(
      item => {
        if (item.parentID === parentID) {
          objects.push(item);
        }
      }
    );
    if (objects) {
      res.status(200).send(objects);
    } else {
      res.status(404).send({
        message: 'Object not found'
      });
    }
  }
);

router.post(
  '/get-favourite-objects-by-id',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    const idsArray = body.idsArray;
    let objects = [];
    testObjects.map(
      item => {
        idsArray.forEach(
          subItem => {
            if (item.id === subItem) {
              objects.push(item);
            }
          }
        )
      }
    );
    if (objects) {
      res.status(200).send(objects);
    } else {
      res.status(404).send({
        message: 'Object not found'
      });
    }
  }
);

export default router;