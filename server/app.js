import { login, authTokenCheck } from './Middleware/login.js';
import { createStudent } from './Schema/studentCreation.js';
import studentInfo from './Routes/student-route.js';
import updateRoute from "./Routes/update-route.js"

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const port = 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:19006' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  express.urlencoded({ extended: false, limit: 100000, parameterLimit: 20 })
);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use('/studentInfo', authTokenCheck, studentInfo);
app.use('/functions', authTokenCheck, updateRoute);

app.post('/login', login);
app.post('/create1', createStudent);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
export default app;
