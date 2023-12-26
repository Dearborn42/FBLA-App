import { isAuthenticated } from './Middleware/auth.js';
import { login } from './Middleware/login.js';
import {createStudent} from './Schema/studentCreation.js';
import art from "./Routes/arts-route.js";
import clubs from "./Routes/clubs-route.js";
import community from "./Routes/community-route.js";
import jobs from "./Routes/jobs-route.js";
import sports from "./Routes/sport-route.js";
import studentInfo from "./Routes/student-route.js";
import elective from "./Routes/elective-route.js";

import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express';
import dotenv from "dotenv"
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import { fileURLToPath } from 'url';
import passportSetup from './Config/passportSetup.js';
dotenv.config()
mongoose.connect(process.env.MONGO_URI)
passportSetup(passport)


const port = 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 20}))
app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/art", isAuthenticated, art);
app.use("/clubs", isAuthenticated, clubs);
app.use("/community", isAuthenticated, community);
app.use("/jobs", isAuthenticated, jobs);
app.use("/sports", isAuthenticated, sports);
app.use("/studentInfo", isAuthenticated, studentInfo);
app.use("/elective", isAuthenticated, elective);

app.post("/login", login)
// app.get("/", isAuthenticated, (req, res) => {
//   res.status(200).json({success: true, user: req.user});
// })
// app.post("/create", createStudent)
app.post("/create1", (req, res)=>{
    req.body.student_form1 = {...req.body};
    res.status(200).json({success: true});
})
app.post("/create2", (req, res)=>{
    req.body.student_form2 = {...req.body};
    res.status(200).json({success: true});
})
app.post("/create3", (req, res)=>{
  req.body.student_form3 = {...req.body};
  res.status(200).json({success: true});
})
app.post("/create4", (req, res)=>{
  req.body.student_form4 = {...req.body};
  res.status(200).json({success: true});
})
app.post("/create5", (req, res)=>{
  req.body.student_form5 = {...req.body};
  res.status(200).json({success: true});
})
app.post("/create6", (req, res)=>{
  req.body.student_form6 = {...req.body};
  res.status(200).json({success: true});
})
app.post("/create7", (req, res)=>{
  req.body.student_form7 = {...req.body};
  console.log(req.body);
  res.status(200).json({success: true});
})
app.listen(port, ()=>{console.log(`listening on port ${port}`)});
export default app;