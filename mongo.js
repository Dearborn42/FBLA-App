import dotenv from 'dotenv';
import { Collection, MongoClient } from 'mongodb';

dotenv.config();

const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');

export class Student{
    constructor(name, grade_level, school, fgrades, sophgrades, jgrades, sengrades){
        let grades = this.setGrades(fgrades, sophgrades, jgrades, sengrades)
        Object.assign(this, {
            name, 
            grade_level, 
            school, 
            "freshman-grades": grades[0], 
            "sophmore-grades": grades[1],
            "junior-grades": grades[2],
            "senior-grades": grades[3],
        });
    }
    setGrades(f, so, j, se){
        let grades = [];
        let allgrades = [f, so, j, se]
        allgrades.map(x => {
            grades.push({"math": x[0]||"N/A", "science": x[1]||"N/A", "english": x[2]||"N/A", "history": x[3]||"N/A"})
        })
        return this && grades
    }
}

export async function createStudent(){
    let student = new Student("Andrew Murphy", 12, "Thunderbird", [23, 45, 67, 89], [12, 34, 56, 78], [9, 21, 43, 65], [87, 65, 43, 21])
    await collection.insertOne(student)
}

createStudent();