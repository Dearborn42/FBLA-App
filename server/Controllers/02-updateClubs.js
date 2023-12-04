import Student from "../Schema/mongoSchema.js";
import { formatFOAU } from "./01-updateStudent.js";

export async function updateClubsDesc(name, club, desc){
    const studentDocument = await Student.findOne({ "name": name });
    const clubIndex = studentDocument.clubs.findIndex(x => x[`club-name`] === club);
    await formatFOAU([
        {"name": name},
        { $set: {[`clubs.${clubIndex}.club-desc`]: desc}},
        { returnOriginal: false }
    ])
}

export async function removeClub(name, club){
    const studentDocument = await Student.findOne({ "name": name });
    const clubIndex = studentDocument.clubs.findIndex(x => x[`club-name`] === club);
    await formatFOAU([
        {"name": name},
        { $pull: {"clubs": studentDocument.clubs[clubIndex]}},
        {returnOriginal: false}
    ])
}

export async function addClub(name, clubName, clubDesc){
    await formatFOAU([
        {"name": name},
        {$push: {"clubs": {"club-name": clubName, "club-desc": clubDesc}}},
        {returnOriginal: false}
    ])
}
