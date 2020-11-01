import { Router } from 'express';
import towns from '../testData/federalRegions';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200,
};

const router = Router();

router.get(
  '/get-towns',
  cors(corsOptions),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
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