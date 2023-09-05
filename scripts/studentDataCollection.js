import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');

export async function getStudents(){
    return await collection.find({}).toArray()
      .then((documents) => {
        console.log(documents);
      })
      .catch((err) => {
        console.error(err);
      })
}