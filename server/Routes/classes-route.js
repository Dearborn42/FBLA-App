import express from 'express';
import {addClass, removeClass, updateClass} from "../Controllers/08-updateClasses.js"
const router = express.Router();


router.post("/add/:year", addClass);
router.delete("/remove/:year/:name", removeClass);
router.post("/update/:year/:name/:field", updateClass)

export default router