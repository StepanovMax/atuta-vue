import { Router } from 'express';
import { update, getAllEmployeesByUserID } from '../server/controllers/employee.controller';

const router = Router();

router.post(
  '/update',
  update,
);

router.get(
  '/getAll',
  getAllEmployeesByUserID,
);

export default router;