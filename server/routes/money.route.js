import { Router } from 'express';
import add from '../server/controllers/money/add';


const router = Router();

router.post(
  '/add',
  add,
);


export default router;