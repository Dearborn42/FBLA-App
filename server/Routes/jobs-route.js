import express from 'express';
import {addJob, removeJob, updateJobDesc} from "../Controllers/03-updateJobs.js"
const router = express.Router();

router.post("/add", addJob);
router.delete("/remove/:name", removeJob);
router.post("/update/:name", updateJobDesc)

export default router