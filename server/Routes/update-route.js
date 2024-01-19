import express from 'express';
import {remove, add} from '../Controllers/update-controller.js';
const router = express.Router();

router.delete("/:field/:name", remove);
router.post("/:field", add);

export default router