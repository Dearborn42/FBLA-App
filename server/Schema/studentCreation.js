import Student from './mongoSchema.js'
import { hashPassword } from '../Middleware/login.js'

export async function createStudent(req, res){
    try{
        req.body.password = await hashPassword(req.body.password)
        const studentObject = new Student(req.body)
        await studentObject.validate()
        await studentObject.save();
        res.status(200).json({success: true});
    }catch(e){
        res.status(500).json({success: false, error: e.message})
    }
    
}