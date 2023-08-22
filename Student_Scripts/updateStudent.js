import dotenv from 'dotenv';
import { Collection, MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');


export async function updateName(name, new_value) {
    try {
        const result = await collection.findOneAndUpdate(
            { "name": name },
            { $set: { "name": new_value } },
            { returnOriginal: false }
        );

        if (result.value) console.log("Passed");
        else console.log("Student doesn't exist or mis-spelled name");

    } catch (err) {
        console.error("Error:", err);
    }
    
}

export async function updateGradeLvl(name, new_value) {
    try{
        const result = await collection.findOneAndUpdate(
            {"name": name}, 
            { $set: { "grade_level": Number(new_value) }},
             { returnOriginal: false }
        );

        if (result.value) console.log("Passed");
        else console.log("Student doesn't exist or mis-spelled name");

    }catch(err){
        console.error("Error:", err);
    }
}


export async function updateSchool(name, new_value) {
    try{
        const result = await collection.findOneAndUpdate(
            {"name": name}, 
            { $set: { "school": new_value}},
             { returnOriginal: false }
        );

        if (result.value) console.log("Passed");
        else console.log("Student doesn't exist or mis-spelled name");

    }catch(err){
        console.error("Error:", err);
    }
}

export async function updateLetterGrades(name, grade_lvl, subject, new_value) {
    try{
        const result = await collection.findOneAndUpdate(
            { "name": name }, 
            { $set: { [`${grade_lvl}-grades.${subject}`]: new_value } },
            { returnOriginal: false }
        );

        if (result.value) console.log("Passed");
        else console.log("Student doesn't exist or mis-spelled name");

    }catch(err){
        console.error("Error:", err);
    }
}