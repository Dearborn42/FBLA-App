import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');

export async function getPublicStudents(){
    return await collection.find({}).toArray()
      .then((documents) => {
        documents = documents.filter((doc) => {
          return doc.private === false;
        })
        console.log(documents)
      })
      .catch((err) => {
        console.error(err);
      })
}

export async function getPrivateStudent(name, pin){
  try{
    const studentDocument = await collection.findOne({ 
      "name": name, 
      "share-pin": pin 
    });
    if(studentDocument){
      return studentDocument;
    }else{
      console.log("Student not found");
      return;
    }
  }catch(err){
    console.error(err);
  }
}