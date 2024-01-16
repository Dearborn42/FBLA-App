import { formatFOAU } from "./01-updateStudent.js";

export async function updateCommunityService(req, res){
    const user = req.user;
    const {field, name} = req.params;
    const {value} = req.body;
    const Index = user["community-service"].findIndex(x => x["name"] === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`community-service.${Index}.${field}`]: value}}
    ], res)
}

export async function removeService(req, res) {
    const user = req.user;
    const {name} = req.params
    await formatFOAU([
        {"email": user.email},
        { $pull: {"community-service": {name: name}}}
    ], res)
}

export async function addService(req, res) {
    const {name, desc, hours} = req.body;
    const user = req.user.email
    await formatFOAU([
        {"email": user},
        { $push: {"community-service": {
                    "name": name,
                    "desc": desc, 
                    "hours": hours
                }
            }
        }
    ], res)
}
