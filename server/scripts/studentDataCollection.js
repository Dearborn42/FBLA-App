import { MongoClient } from 'mongodb';
import { MONGO } from '@env'
import student  from '../../Schema/mongoSchema.js';


export async function getFullPublicStudents(){
    return await student.find({}).toArray()
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
    return await student.find({}).toArray()
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
    const studentDocument = await student.findOne({ 
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
    const studentDocument = await student.findOne({ 
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
