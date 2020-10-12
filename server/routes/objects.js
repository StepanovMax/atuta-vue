import express from 'express';
import { Router } from 'express';
import testData from './testData';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:9001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const router = Router();


router.get(
  '/',
  cors(corsOptions),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({
      message: 'Objects response OK - 200'
    });
  }
);


router.get(
  '/asd',
  cors(corsOptions),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({
      message: 'Хей-хей ?!'
    });
  }
);

router.get(
  '/get-objects',
  cors(corsOptions),
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (testData) {
      res.status(200).send(testData);
    } else {
      res.status(404).send({
        message: 'Object not found'
      });
    }
  }
);

router.post(
  '/get-object-by-id',
  cors(corsOptions),
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

export default router;