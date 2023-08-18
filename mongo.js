import dotenv from 'dotenv';
import { Collection, MongoClient } from 'mongodb';

dotenv.config();

const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');

export class Student{
    constructor(name, grade_level, school){
        Object.assign(this, {
            
        });
    }
}

export async function createStudent(){
    let student = new Student("Andrew Murphy", 12)
    await collection.insertOne(student)
}

createStudent();