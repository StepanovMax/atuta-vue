import { Router } from 'express';
import testHelpData from '../testData/testHelpData';

const router = Router();

router.get(
  '/get-help-all',
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (testHelpData) {
      res.status(200).send(testHelpData);
    } else {
      res.status(404).send({
        message: 'Help data not found'
      });
    }
  }
);

router.post(
  '/get-help-by-id',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    const helpID = parseInt(body.id);
    let help;
    testHelpData.map(
      item => {
        if (item.id === helpID) {
          help = item;
        }
      }
    );
    if (help) {
      res.status(200).send(help);
    } else {
      res.status(404).send({
        message: 'Help not found'
      });
    }
  }
);

export default router;