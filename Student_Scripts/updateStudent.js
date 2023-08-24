import dotenv from 'dotenv';
import { Collection, MongoClient } from 'mongodb';
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