import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
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

export async function updateName(name, new_value) {
    await formatFOAU([
        { "name": name },
        { $set: { "name": new_value } },
        { returnOriginal: false }
    ])
}

export async function updateGradeLvl(name, new_value) {
    await formatFOAU([
        {"name": name}, 
        { $set: { "grade_level": Number(new_value) }},
        { returnOriginal: false }
    ])
}


export async function updateSchool(name, new_value) {
    await formatFOAU([
        {"name": name}, 
        { $set: { "school": new_value}},
        { returnOriginal: false }
    ])
}

export async function updateLetterGrades(name, grade_lvl, subject, new_value) {
    await formatFOAU([
        { "name": name }, 
        { $set: { [`${grade_lvl}-grades.${subject}`]: new_value } },
        { returnOriginal: false }
    ])
}

export async function updateClubsDesc(name, club, desc){
    const studentDocument = await collection.findOne({ "name": name });
    const clubIndex = studentDocument.clubs.findIndex(x => x[`${club}`]);
    await formatFOAU([
        {"name": name},
        { $set: {[`clubs.${clubIndex}.${club}`]: desc}},
        { returnOriginal: false }
    ])
}

export async function removeClub(name, club){
    const studentDocument = await collection.findOne({ "name": name });
    const clubIndex = studentDocument.clubs.findIndex(x => x[`${club}`]);
    await formatFOAU([
        {"name": name},
        { $pull: {"clubs": studentDocument.clubs[clubIndex]}},
        {returnOriginal: false}
    ])
}

export async function addClub(name, clubName, clubDesc){
    await formatFOAU([
        {"name": name},
        {$push: {"clubs": {[`${clubName}`]: clubDesc}}},
        {returnOriginal: false}
    ])
}

export async function addJob(name, jobName, jobDesc, jobType){
    await formatFOAU([
        {"name": name},
        {$push: {"work": {
            "company": jobName,
            "job_desc": jobDesc, 
            "type": jobType
        }}},
        {returnOriginal: false}
    ])
}
export async function removeJob(name, job){
    const studentDocument = await collection.findOne({ "name": name });
    const index = studentDocument.work.findIndex(x => x.company === job);
    await formatFOAU([
        {"name": name},
        { $pull: {"work": studentDocument.work[index]}},
        {returnOriginal: false}
    ])
}

export async function updateJobDesc(name, job, newDesc){
    const studentDocument = await collection.findOne({ "name": name });
    const index = studentDocument.work.findIndex(x => x.company === job);
    await formatFOAU([
        {"name": name},
        { $set: {[`work.${index}.job_desc`]: newDesc}}
    ]);
}

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