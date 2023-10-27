import { MongoClient } from 'mongodb';
import { MONGO } from '@env';
import { formatFOAU } from './01-updateStudent.js';
import student  from '../../Schema/mongoSchema.js'
const client = await MongoClient.connect(MONGO);
const collection = client.db('ClusterDB').collection('students');


export async function removeElective(name, elective){
    const studentDocument = await student.findOne({ "name": name });
    const Index = studentDocument[`elective-grades`].findIndex(x => x[`elective-name`] === elective);
    await formatFOAU([
        {"name": name},
        { $pull: {"elective-grades": studentDocument[`elective-grades`][Index]}},
        {returnOriginal: false}
    ])
}

export async function addElective(name, electiveName, electiveGrade){
    await formatFOAU([
        {"name": name},
        {$push: {"elective-grades": {"elective-name": electiveName, "elective-grade": electiveGrade}}},
        {returnOriginal: false}
    ])
}

export async function updateElectiveGrade(name, electiveName, electiveGrade){
    const studentDocument = await student.findOne({ "name": name });
    const Index = studentDocument["elective-grades"].findIndex(x => x[`elective-name`] === electiveName);
    await formatFOAU([
        {"name": name},
        { $set: {[`elective-grades.${Index}.elective-grade`]: electiveGrade}},
        { returnOriginal: false }
    ])
}