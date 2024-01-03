import { formatFOAU } from "./01-updateStudent.js";

export async function updateCommunityService(req, res){
    const user = req.user;
    const {field, name} = req.params;
    const {value} = req.body;
    const Index = user["community-service"].findIndex(x => x["service-name"] === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`community-service.${Index}.${field}`]: value}},
        { returnOriginal: false }
    ], res)
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
