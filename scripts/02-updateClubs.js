import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');

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
