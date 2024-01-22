import express from 'express';
import {remove, add, update} from '../Controllers/update-controller.js';
const router = express.Router();

router.delete("/remove/:field/:name", remove);
router.post("/add/:field", add);
router.put("/update/:field/:name/:area", update)

export default router