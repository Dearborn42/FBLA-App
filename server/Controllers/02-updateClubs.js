import Student from "../Schema/mongoSchema.js";
import { formatFOAU } from "./01-updateStudent.js";

export async function updateClubsDesc(req, res){
    const {name} = req.params;
    const {value} = req.body
    const studentDocument = req.user
    const clubIndex = studentDocument.clubs.findIndex(x => x[`club-name`] === name);
    await formatFOAU([
        {"email": studentDocument.email},
        { $set: {[`clubs.${clubIndex}.club-desc`]: value}},
        { returnOriginal: false }
    ], res)
}

export async function removeClub(req, res){
    const {name} = req.params;
    const studentDocument = req.user;
    const clubIndex = studentDocument.clubs.findIndex(x => x[`club-name`] === name);
    await formatFOAU([
        {"name": name},
        { $pull: {"clubs": studentDocument.clubs[clubIndex]}},
        {returnOriginal: false}
    ], res)
}

export async function addClub(req, res){
    const {name, desc} = req.body;
    await formatFOAU([
        {"email": req.user.email},
        {$push: {"clubs": {"club-name": name, "club-desc": desc}}},
        {returnOriginal: false}
    ], res)
}
