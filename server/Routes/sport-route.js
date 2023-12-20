import express from 'express';
import {updateSportAwards, updateSportDesc, updateSportName, addSport, removeSport} from "../Controllers/06-updateSport.js";
const router = express.Router();


export default router