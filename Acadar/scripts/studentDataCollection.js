import { MongoClient } from 'mongodb';
import { MONGO } from '@env'
const client = await MongoClient.connect(MONGO);
const collection = client.db('ClusterDB').collection('students');

export async function getFullPublicStudents(){
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
export async function getPublicStudentsName(){
    return await collection.find({}).toArray()
      .then((documents) => {
        documents = documents.filter((doc) => {
          return doc.private === false;
        }).map((doc) => {
          return doc.name;
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

export async function getStudent(name, email, school){
  try{
    const studentDocument = await collection.findOne({ 
      "name": name, 
      "email": email,
      "school": school 
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
