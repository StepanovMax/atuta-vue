import { Router } from 'express';
import testDialogs from '../testData/testDialogs';

const router = Router();


router.post(
  '/get-dialogs-by-user-id',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    const userID = body.userID;
    let myDialogs = [];
    testDialogs.map(
      item => {
        if (item.userID === userID) {
          myDialogs.push(item);
        }
      }
    );
    if (myDialogs) {
      res.status(200).send(myDialogs);
    } else {
      res.status(404).send({
        message: 'Dialogs dont found'
      });
    }
  }
);


router.post(
  '/get-dialog-by-id',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    const dialogID = body.dialogID;
    let myDialog = {};
    testDialogs.map(
      item => {
        if (item.dialogID === dialogID) {
          myDialog = item;
        }
      }
    );
    if (myDialog) {
      res.status(200).send(myDialog);
    } else {
      res.status(404).send({
        message: 'Dialog dont found'
      });
    }
  }
);


router.get(
  '/get-all-dialogs-length',
  (req, res) => {
    console.log('router ::');
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const dialogsLength = testDialogs.length;
    if (dialogsLength) {
      res.status(200).send({
        length: dialogsLength
      });
    } else {
      res.status(404).send({
        message: 'Dialogs length dont found'
      });
    }
  }
);

export default router;