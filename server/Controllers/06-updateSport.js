import { formatFOAU } from "./01-updateStudent.js";

export async function addSport(req, res) {
    const user = req.user;
    const {name, desc, awards} = req.body;
    await formatFOAU([
        {"email": user.email},
        { $push: {"sports": {
            "name": name,
            "desc": desc,
            "award": awards
        }}}
    ], res)
}

export async function removeSport(req, res) {
    const user = req.user;
    const {name} = req.params;
    await formatFOAU([
        {"email": user.email},
        { $pull: {"sports": {name: name}}}
    ], res)
}

export async function updateSport(req, res) {
    const user = req.user;
    const {name, field} = req.params;
    const {value} = req.body;
    const Index = user["sports"].findIndex(x => x["name"] === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`sports.${Index}.${field}`]: value}}
    ], res)
}
