import express from 'express';
import {addClub, removeClub, updateClubsDesc} from "../Controllers/02-updateClubs.js"
const router = express.Router();

router.post("/add", addClub);
router.delete("/remove/:name", removeClub);
router.post("/update/:name/:field", updateClubsDesc);

export default router