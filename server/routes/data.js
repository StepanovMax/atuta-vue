import { Router } from 'express';
import towns from '../testData/federalRegions';

const router = Router();

router.get(
  '/get-towns',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    if (towns) {
      res.status(200).send(towns);
    } else {
      res.status(404).send({
        message: 'Towns were not found'
      });
    }
  }
);

export default router;