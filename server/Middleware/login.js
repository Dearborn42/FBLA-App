import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import Student from "../Schema/mongoSchema.js";
dotenv.config();

export async function hashPassword(password){
  return await bcrypt.hash(password, 10);
}

export async function login(req, res) {
  const {email, password} = req.body;
  try {
    const user = await Student.findOne({email});
    if(!user) 
      return res.status(400).json({success: false, message: "Wrong email or password"});
    if(!user.validPassword(password)) 
      return res.status(400).json({success: false, message: "Wrong email or password"});
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "1h" });
    req.session.token = token;
    return res.status(200).json({success: true, user });
  } catch (error) {
    return res.status(500).json({success: false, message: error.message});
  }
}

export async function authTokenCheck(req, res, next) {
  if(req.session.token)
    return next()
  return res.status(401).json({success: false, message: "Not logged in"});
}
