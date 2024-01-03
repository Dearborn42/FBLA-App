import express from 'express';
import {
    updateCommunityService, removeService, addService
} from "../Controllers/05-updateCommunityServce.js";
const router = express.Router();

router.post('/add', addService);
router.delete('/remove/:name', removeService);
router.post("/update/:name/:field", updateCommunityService);

export default router