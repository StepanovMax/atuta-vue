import { Router } from 'express';
import companiesList from './companiesList';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200,
};

const router = Router();

router.get(
  '/get-companies-all',
  cors(corsOptions),
  (req, res) => {
    console.log('===');
    res.header("Access-Control-Allow-Origin", "*");
    if (companiesList) {
      res.status(200).send(companiesList);
    } else {
      res.status(404).send({
        message: 'Companies not found'
      });
    }
  }
);

export default router;