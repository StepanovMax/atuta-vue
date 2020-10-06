import { Router } from 'express';
import testData from './testData';

const router = Router();

router.post(
  '/get-object-by-id',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    const objectID = parseInt(body.id);
    let object;
    testData.map(
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

router.get(
  '/get-objects',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (testData) {
      res.status(200).send(testData);
    } else {
      res.status(404).send({
        message: 'Object not found'
      });
    }
  }
);

export default router;