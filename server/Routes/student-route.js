import express from 'express';
import {updateStudent} from "../Controllers/01-updateStudent.js"
const router = express.Router();

router.post("/update/:type", updateStudent)

export default router;
