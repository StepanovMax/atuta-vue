import { Router } from 'express';
const tutorials = require("../controllers/tutorial.controller.js");

const router = Router();

router.post("/", tutorials.create);

// Retrieve all Tutorials
router.get("/", tutorials.findAll);

export default router;