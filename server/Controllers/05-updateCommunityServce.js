import { formatFOAU } from "./01-updateStudent.js";

export async function updateCommunityService(req, res){
    const user = req.user;
    const {field, name} = req.params;
    const {value} = req.body;
    const Index = user["communityService"].findIndex(x => x["name"] === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`communityService.${Index}.${field}`]: value}}
    ], res)
}

export async function removeService(req, res) {
    const user = req.user;
    const {name} = req.params
    await formatFOAU([
        {"email": user.email},
        { $pull: {"communityService": {name: name}}}
    ], res)
}

export async function addService(req, res) {
    const {name, desc, hours} = req.body;
    const user = req.user.email
    await formatFOAU([
        {"email": user},
        { $push: {"communityService": {
                    "name": name,
                    "desc": desc, 
                    "hours": hours
                }
            }
        }
    ], res)
}
