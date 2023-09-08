import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');


export async function login(email, password) {
    try{
    const studentDocument = await collection.findOne({ 
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