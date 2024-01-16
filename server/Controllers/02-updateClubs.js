import { formatFOAU } from "./01-updateStudent.js";

export async function updateClubsDesc(req, res){
    const {name, field} = req.params;
    const {value} = req.body
    const studentDocument = req.user
    const clubIndex = studentDocument.clubs.findIndex(x => x[`name`] === name);
    await formatFOAU([
        {"email": studentDocument.email},
        { $set: {[`clubs.${clubIndex}.${field}`]: value}}
    ], res)
}

export async function removeClub(req, res){
    const {name} = req.params;
    const user = req.user;
    await formatFOAU([
        {"email": user.email},
        { $pull: {"clubs": {name: name}}},
    ], res)
}

export async function addClub(req, res){
    const {name, desc} = req.body;
    await formatFOAU([
        {"email": req.user.email},
        {$push: {"clubs": {"name": name, "desc": desc}}}
    ], res)
}
