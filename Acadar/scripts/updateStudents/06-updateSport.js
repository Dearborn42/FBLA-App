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
