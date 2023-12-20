import Student from "../Schema/mongoSchema.js";
import { formatFOAU } from "./01-updateStudent.js";

export async function addArt(req, res) {
    const {name, desc, awards} = req.body;
    const userName = req.user.name;
    await formatFOAU([
        {"name": userName},
        { $push: {"perfrorming-arts": {
            "performing-art": name,
            "desc": desc,
            "awards/achievments": awards
        }}},
        { returnOriginal: false }
    ], res)
}

export async function removeArt(res, req) {
    const {name} = req.params
    const userName = req.user.name;
    const studentDocument = await Student.findOne({ "name": userName });
    const Index = studentDocument["perfrorming-arts"].findIndex(x => x["performing-art"] === name);
    await formatFOAU([
        {"name": userName},
        { $pull: {"perfrorming-arts": studentDocument["perfrorming-arts"][`${Index}`]}},
        { returnOriginal: false }
    ], res)
}

export async function updateArtName(req, res) {
    const {name} = req.params;
    const {value} = req.body
    const userName = req.user.name
    const studentDocument = await Student.findOne({ "name": userName });
    const Index = studentDocument["perfrorming-arts"].findIndex(x => x["performing-art"] === name);
    await formatFOAU([
        {"name": userName},
        { $set: {[`perfrorming-arts.${Index}.performing-art`]: value}},
        { returnOriginal: false }
    ], res)
}

export async function updateArtDesc(req, res) {
    const {name} = req.params;
    const {value} = req.body
    const userName = req.user.name
    const studentDocument = await Student.findOne({ "name": userName });
    const Index = studentDocument["perfrorming-arts"].findIndex(x => x["performing-art"] === name);
    await formatFOAU([
        {"name": userName},
        { $set: {[`perfrorming-arts.${Index}.desc`]: value}},
        { returnOriginal: false }
    ], res)
}

export async function updateArtAwards(req, res) {
    const {name} = req.params;
    const {value} = req.body
    const userName = req.user.name
    const studentDocument = await Student.findOne({ "name": userName });
    const Index = studentDocument["perfrorming-arts"].findIndex(x => x["performing-art"] === name);
    await formatFOAU([
        {"name": userName},
        { $set: {[`perfrorming-arts.${Index}.awards/achievments`]: value}},
        { returnOriginal: false }
    ])
}