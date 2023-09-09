import { MongoClient } from 'mongodb';
import { MONGO } from '@env'
const client = await MongoClient.connect(MONGO);
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