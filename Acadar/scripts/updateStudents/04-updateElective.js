import { MongoClient } from 'mongodb';
import { MONGO } from '@env'
const client = await MongoClient.connect(MONGO);
const collection = client.db('ClusterDB').collection('students');

async function formatFOAU(info){
    try{
        const result = await collection.findOneAndUpdate(
            info[0],
            info[1],
            info[2]
        );
        if (result.value) console.log("Passed");
        else console.log("Student doesn't exist or mis-spelled name");
    }catch(e){
        console.error("Error:", e);
    }
}

export async function removeElective(name, elective){
    const studentDocument = await collection.findOne({ "name": name });
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
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["elective-grades"].findIndex(x => x[`elective-name`] === electiveName);
    await formatFOAU([
        {"name": name},
        { $set: {[`elective-grades.${Index}.elective-grade`]: electiveGrade}},
        { returnOriginal: false }
    ])
}