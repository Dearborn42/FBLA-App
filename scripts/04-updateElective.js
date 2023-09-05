import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');

export async function removeElective(name, elective){
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument[`elective-grades`].findIndex(x => x[`${elective}`]);
    await formatFOAU([
        {"name": name},
        { $pull: {"elective-grades": studentDocument[`elective-grades`][Index]}},
        {returnOriginal: false}
    ])
}

export async function addElective(name, electiveName, electiveGrade){
    await formatFOAU([
        {"name": name},
        {$push: {"elective-grades": {[`${electiveName}`]: electiveGrade}}},
        {returnOriginal: false}
    ])
}

export async function updateElectiveGrade(name, electiveName, electiveGrade){
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["elective-grades"].findIndex(x => x[`${electiveName}`]);
    await formatFOAU([
        {"name": name},
        { $set: {[`elective-grades.${Index}.${electiveName}`]: electiveGrade}},
        { returnOriginal: false }
    ])
}