import dotenv from 'dotenv';
import { Collection, MongoClient } from 'mongodb';
import {Student} from './Student_Scripts/studentObject.js'

dotenv.config();

const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');

export async function createStudent(){
    let student = new Student("Andrew Murphy", 12, "Thunderbird", [23, 45, 67, 89], [12, 34, 56, 78], [9, 21, 43, 65])
    await collection.insertOne(student)
}

createStudent();