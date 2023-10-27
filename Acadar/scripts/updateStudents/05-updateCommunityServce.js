import { MongoClient } from 'mongodb';
import { MONGO } from '@env';
import { formatFOAU } from './01-updateStudent.js';
import student  from '../../Schema/mongoSchema.js';

export async function updateServiceName(name, serviceName, newServiceName) {
    const studentDocument = await student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $set: {[`community-service.${Index}.service-name`]: newServiceName}},
        { returnOriginal: false }
    ])
}

export async function updateServiceDesc(name, serviceName, newServiceDesc) {
    const studentDocument = await student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $set: {[`community-service.${Index}.service-desc`]: newServiceDesc}},
        { returnOriginal: false }
    ])
}

export async function updateServiceHours(name, serviceName, hours) {
    const studentDocument = await student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $set: {[`community-service.${Index}.service-hours`]: hours}},
        { returnOriginal: false }
    ])
}

export async function updateServiceDate(name, serviceName, startDate, endDate) {
    const studentDocument = await student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $set: {[`community-service.${Index}.service-date`]: `${startDate} - ${endDate}`}},
        { returnOriginal: false }
    ])
}

export async function removeService(name, serviceName) {
    const studentDocument = await student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $pull: {[`community-service`]: studentDocument["community-service"][`${Index}`]}},
        { returnOriginal: false }
    ])
}

export async function addService(name, serviceName, serviceDesc, serviceHours, serviceStartDate, serviceEndDate) {
    await formatFOAU([
        {"name": name},
        { $push: {"community-service": {
                    "service-name": serviceName,
                    "service-desc": serviceDesc, 
                    "service-hours": serviceHours,
                    "service-date": `${serviceStartDate} - ${serviceEndDate}`
                }
            }
        },
        { returnOriginal: false }
    ])
}
