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
    const samePass = await user.validPassword(password);
    if(!samePass) 
      return res.status(400).json({success: false, message: "Wrong email or password"});
    const token = jwt.sign({ user, "access": true }, process.env.SECRET_KEY, { expiresIn: "1h" });
    req.session.user = {email};
    return res.status(200).json({success: true, user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: error.message});
  }
}

export async function authTokenCheck(req, res, next) {
  console.log(req.session);
  if(req.session.user)
    return next()
  return res.status(401).json({success: false, message: "Not logged in"});
}
