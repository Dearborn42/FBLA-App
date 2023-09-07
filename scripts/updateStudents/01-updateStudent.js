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

export async function updateEmail(name, password, newEmail){
    const studentDocument = await collection.findOne({ "name": name });
    if(password === studentDocument.password){
        await formatFOAU([
            {"name": name},
            { $set: { "email": newEmail}},
            { returnOriginal: false }
        ])
    }else{
        console.log("Please enter right password");
    }
}

export async function updatePassword(name, email, Oldpassword, newPassword){
    const studentDocument = await collection.findOne({ "name": name });
    if(Oldpassword === studentDocument.password && email === studentDocument.email){
        await formatFOAU([
            {"name": name},
            { $set: { "password": newPassword}},
            { returnOriginal: false }
        ])
    }else{
        console.log("Please enter right password or email");
    }
}

export async function updateSharePin(name, password, email, newSharePin){
    const studentDocument = await collection.findOne({ "name": name });
    if(password === studentDocument.password && email === studentDocument.email){
        await formatFOAU([
            {"name": name},
            { $set: { "share-pin": newSharePin}},
            { returnOriginal: false }
        ])
    }else{
        console.log("Please enter right password or email");
    }
}

export async function updatePrivacy(name, password, email){
    const studentDocument = await collection.findOne({ "name": name });
    if(password === studentDocument.password && email === studentDocument.email){
        await formatFOAU([
            {"name": name},
            { $set: { "private": !studentDocument.private}},
            { returnOriginal: false }
        ])
    }else{
        console.log("Please enter right password or email");
    }
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