import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { formatFOAU } from "./01-updateStudent"
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');


export async function addArt(name, artName, artDesc, artAwards) {
    await formatFOAU([
        {"name": name},
        { $push: {"perfrorming-arts": {
            "performing-art": artName,
            "desc": artDesc,
            "awards/achievments": artAwards
        }}},
        { returnOriginal: false }
    ])
}

export async function removeArt(name, artName) {
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["perfrorming-arts"].findIndex(x => x["performing-art"] === artName);
    await formatFOAU([
        {"name": name},
        { $pull: {"perfrorming-arts": studentDocument["perfrorming-arts"][`${Index}`]}},
        { returnOriginal: false }
    ])
}

export async function updateArtName(name, artName, newName) {
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["perfrorming-arts"].findIndex(x => x["performing-art"] === artName);
    await formatFOAU([
        {"name": name},
        { $set: {[`perfrorming-arts.${Index}.performing-art`]: newName}},
        { returnOriginal: false }
    ])
}

export async function updateArtDesc(name, artName, newDesc) {
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["perfrorming-arts"].findIndex(x => x["performing-art"] === artName);
    await formatFOAU([
        {"name": name},
        { $set: {[`perfrorming-arts.${Index}.desc`]: newDesc}},
        { returnOriginal: false }
    ])
}

export async function updateArtAwards(name, artName, newAwards) {
    const studentDocument = await collection.findOne({ "name": name });
    const Index = studentDocument["perfrorming-arts"].findIndex(x => x["performing-art"] === artName);
    await formatFOAU([
        {"name": name},
        { $set: {[`perfrorming-arts.${Index}.awards/achievments`]: newAwards}},
        { returnOriginal: false }
    ])
}