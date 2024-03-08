import Student from './mongoSchema.js'
import { hashPassword } from '../Middleware/login.js'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export async function createStudent(req, res){
    try{
        req.body.password = await hashPassword(req.body.password)
        const studentObject = new Student(req.body)
        await studentObject.validate()
        await studentObject.save();
        const token = jwt.sign({ user: studentObject }, process.env.SECRET_KEY, { expiresIn: "1h" });
        req.session.token = token;
        res.status(200).json({success: true, user: studentObject});
    }catch(e){
        res.status(500).json({success: false, error: e.message})
    }
    
}