import express from 'express';
import {addElective, removeElective, updateElectiveGrade} from "../Controllers/04-updateElective.js"
const router = express.Router();


router.post("/add", addElective);
router.delete("/remove/:name", removeElective);
router.post("/update/:name", updateElectiveGrade)

export default router