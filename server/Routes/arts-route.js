import express from 'express';
import {addArt, removeArt, updateArt} from "../Controllers/07-updatePerformingArt.js"
const router = express.Router();

router.post("/add", addArt);
router.delete("/remove/:name", removeArt);
router.post("/update/:name/:field", updateArt);


export default router