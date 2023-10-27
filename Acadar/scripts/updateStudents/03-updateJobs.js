import { MongoClient } from 'mongodb';
import { MONGO } from '@env';
import { formatFOAU } from './01-updateStudent.js';
import student  from '../../Schema/mongoSchema.js'
const client = await MongoClient.connect(MONGO);
const collection = client.db('ClusterDB').collection('students');


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
    const studentDocument = await student.findOne({ "name": name });
    const index = studentDocument.work.findIndex(x => x.company === job);
    await formatFOAU([
        {"name": name},
        { $pull: {"work": studentDocument.work[index]}},
        {returnOriginal: false}
    ])
}

export async function updateJobDesc(name, job, newDesc){
    const studentDocument = await student.findOne({ "name": name });
    const index = studentDocument.work.findIndex(x => x.company === job);
    await formatFOAU([
        {"name": name},
        { $set: {[`work.${index}.job_desc`]: newDesc}}
    ]);
}
