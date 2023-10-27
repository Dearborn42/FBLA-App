import { MongoClient } from 'mongodb';
import { MONGO } from '@env'
import { formatFOAU } from './01-updateStudent.js';
import student  from '../../Schema/mongoSchema.js'
const client = await MongoClient.connect(MONGO);
const collection = client.db('ClusterDB').collection('students');

export async function updateClubsDesc(name, club, desc){
    const studentDocument = await student.findOne({ "name": name });
    const clubIndex = studentDocument.clubs.findIndex(x => x[`club-name`] === club);
    await formatFOAU([
        {"name": name},
        { $set: {[`clubs.${clubIndex}.club-desc`]: desc}},
        { returnOriginal: false }
    ])
}

export async function removeClub(name, club){
    const studentDocument = await studentstudent.findOne({ "name": name });
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
