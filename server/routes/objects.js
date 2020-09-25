import { Router } from 'express';
import testData from './testData';

const router = Router();

router.post(
  '/get-object-by-id',
  (req, res) => {
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

export default router;