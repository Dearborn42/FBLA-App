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

export async function updateClubsDesc(name, club, desc){
    const studentDocument = await collection.findOne({ "name": name });
    const clubIndex = studentDocument.clubs.findIndex(x => x[`club-name`] === club);
    await formatFOAU([
        {"name": name},
        { $set: {[`clubs.${clubIndex}.club-desc`]: desc}},
        { returnOriginal: false }
    ])
}

export async function removeClub(name, club){
    const studentDocument = await collection.findOne({ "name": name });
    const clubIndex = studentDocument.clubs.findIndex(x => x[`club-name`] === club);
    await formatFOAU([
        {"name": name},
        { $pull: {"clubs": studentDocument.clubs[clubIndex]}},
        {returnOriginal: false}
    ])
}

export async function addClub(name, clubName, clubDesc){
    await formatFOAU([
        {"name": name},
        {$push: {"clubs": {"club-name": clubName, "club-desc": clubDesc}}},
        {returnOriginal: false}
    ])
}
