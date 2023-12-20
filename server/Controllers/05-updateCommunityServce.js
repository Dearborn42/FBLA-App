import Student from "../Schema/mongoSchema.js";
import { formatFOAU } from "./01-updateStudent.js";

export async function updateServiceName(name, serviceName, newServiceName) {
    const studentDocument = await Student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $set: {[`community-service.${Index}.service-name`]: newServiceName}},
        { returnOriginal: false }
    ])
}

export async function updateServiceDesc(name, serviceName, newServiceDesc) {
    const studentDocument = await Student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $set: {[`community-service.${Index}.service-desc`]: newServiceDesc}},
        { returnOriginal: false }
    ])
}

export async function updateServiceHours(name, serviceName, hours) {
    const studentDocument = await Student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $set: {[`community-service.${Index}.service-hours`]: hours}},
        { returnOriginal: false }
    ])
}

export async function updateServiceDate(name, serviceName, startDate, endDate) {
    const studentDocument = await Student.findOne({ "name": name });
    const Index = studentDocument["community-service"].findIndex(x => x["service-name"] === serviceName);
    await formatFOAU([
        {"name": name},
        { $set: {[`community-service.${Index}.service-date`]: `${startDate} - ${endDate}`}},
        { returnOriginal: false }
    ])
}

export async function removeService(req, res) {
    const user = req.user;
    const {name} = req.params
    const Index = user["community-service"].findIndex(x => x["service-name"] === name);
    await formatFOAU([
        {"email": user.email},
        { $pull: {[`community-service`]: user["community-service"][`${Index}`]}},
        { returnOriginal: false }
    ], res)
}

export async function addService(req, res) {
    const {name, desc, hours, start, end} = req.body;
    const user = req.user.email
    await formatFOAU([
        {"email": user},
        { $push: {"community-service": {
                    "service-name": name,
                    "service-desc": desc, 
                    "service-hours": hours,
                    "service-date": `${start} - ${end}`
                }
            }
        },
        { returnOriginal: false }
    ], res)
}
