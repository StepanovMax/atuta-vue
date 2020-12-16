import { Router } from 'express';
import tutorials from "../server/controllers/tutorial.controller.js";

const router = Router();

router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

export default router;