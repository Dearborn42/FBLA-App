import express from 'express';
import {
    updateServiceDate, updateServiceDesc, updateServiceHours, updateServiceName, removeService, addService
} from "../Controllers/05-updateCommunityServce.js";
const router = express.Router();

router.post('/add', addService);
router.delete('/remove/:name', removeService);

export default router