import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');


export async function addSport(name, sportName, sportDesc, sportAwards) {
    await formatFOAU([
        {"name": name},
        { $push: {"sports": {
            "sport": sportName,
            "sport-desc": sportDesc,
            "awards/achievments": sportAwards
        }}},
        { returnOriginal: false }
    ])
}

export async function removeSport(name, sportName) {
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["sports"].findIndex(x => x["sport"] === sportName);
    await formatFOAU([
        {"name": name},
        { $pull: {"sports": studentDocument["sports"][`${Index}`]}},
        { returnOriginal: false }
    ])
}

export async function updateSportName(name, sportName, newName) {
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["sports"].findIndex(x => x["sport"] === sportName);
    await formatFOAU([
        {"name": name},
        { $set: {[`sports.${Index}.sport`]: newName}},
        { returnOriginal: false }
    ])
}

export async function updateSportDesc(name, sportName, newDesc) {
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["sports"].findIndex(x => x["sport"] === sportName);
    await formatFOAU([
        {"name": name},
        { $set: {[`sports.${Index}.sport-desc`]: newDesc}},
        { returnOriginal: false }
    ])
}

export async function updateSportAwards(name, sportName, newAwards) {
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["sports"].findIndex(x => x["sport"] === sportName);
    await formatFOAU([
        {"name": name},
        { $set: {[`sports.${Index}.awards/achievments`]: newAwards}},
        { returnOriginal: false }
    ])
}
