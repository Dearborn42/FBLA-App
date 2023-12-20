import express from 'express';
import {addArt, removeArt, updateArtName, updateArtDesc, updateArtAwards} from "../Controllers/07-updatePerformingArt.js"
const router = express.Router();

router.post("/add", addArt);
router.delete("/remove/:name", removeArt);
router.post("/updateName/:name", updateArtName);
router.post("/updateDesc/:name", updateArtDesc);
router.post("/updateAwards/:name", updateArtAwards);


export default router