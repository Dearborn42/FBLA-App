import { MongoClient } from 'mongodb';
import { MONGO } from '@env'
import student  from '../../Schema/mongoSchema.js';


export async function login(email, password) {
    try{
    const studentDocument = await student.findOne({ 
      "email": email, 
      "password": password 
    });
    if(studentDocument){
      return true;
    }else{
      console.log("Email or password is incorrect");
      return false;
    }
  }catch(err){
    console.error(err);
  }
}