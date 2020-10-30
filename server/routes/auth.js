import express from 'express';
import { Router } from 'express';
import testObjects from '../testData/testObjects';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = Router();

router.post(
  '/login',
  cors(corsOptions),
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    if (body.login === 'admin' && body.password === '12345678') {
      res.status(200).send(true);
    } else {
      res.status(404).send(false);
    }
  }
);

export default router;