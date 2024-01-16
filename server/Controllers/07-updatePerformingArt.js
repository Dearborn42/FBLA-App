import { formatFOAU } from "./01-updateStudent.js";

export async function addArt(req, res) {
    const {name, desc, award} = req.body;
    const userName = req.user.email;
    await formatFOAU([
        {"email": userName},
        { $push: {"perfrormingArts": {
            "name": name,
            "desc": desc,
            "award": award
        }}}
    ], res)
}

export async function removeArt(req, res) {
    const {name} = req.params;
    const userName = req.user.email;
    await formatFOAU([
        {"email": userName},
        { $pull: {"perfrormingArts": {name: name}}}
    ], res)
}

export async function updateArt(req, res){
    const {name, field} = req.params;
    const {value} = req.body
    const user = req.user
    const Index = user["perfrormingArts"].findIndex(x => x["name"] === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`perfrormingArts.${Index}.${field}`]: value}}
    ], res)
}
