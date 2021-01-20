import { Router } from 'express';
import testCompanies from '../testData/testCompanies';

const router = Router();

router.get(
  '/get-companies-all',
  (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (testCompanies) {
      res.status(200).send(testCompanies);
    } else {
      res.status(404).send({
        message: 'Companies not found'
      });
    }
  }
);

router.post(
  '/get-company-by-id',
  (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    const { body } = req;
    const companyID = parseInt(body.id);
    let company;
    testCompanies.map(
      item => {
        if (item.id === companyID) {
          company = item;
        }
      }
    );
    if (company) {
      res.status(200).send(company);
    } else {
      res.status(404).send({
        message: 'Company not found'
      });
    }
  }
);

export default router;