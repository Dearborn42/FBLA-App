import express from 'express';
import {updateSport, addSport, removeSport} from "../Controllers/06-updateSport.js";
const router = express.Router();

router.post("/add", addSport);
router.delete("/remove/:name", removeSport);
router.post("/update/:name/:type", updateSport)

export default router