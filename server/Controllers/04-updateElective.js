import Student from "../Schema/mongoSchema.js";
import { formatFOAU } from "./01-updateStudent.js";

export async function removeElective(req, res){
    const user = req.user;
    const {name} = req.params;
    const Index = user[`elective-grades`].findIndex(x => x[`elective-name`] === name);
    await formatFOAU([
        {"email": user.email},
        { $pull: {"elective-grades": user[`elective-grades`][Index]}},
        {returnOriginal: false}
    ], res)
}

export async function addElective(req, res){
    const user = req.user;
    const {name, grade} = req.body
    await formatFOAU([
        {"email": user.email},
        {$push: {"elective-grades": {"elective-name": name, "elective-grade": grade}}},
        {returnOriginal: false}
    ], res)
}

export async function updateElectiveGrade(req, res){
    const user = req.user;
    const {name} = req.params;
    const {value} = req.body;
    const Index = user["elective-grades"].findIndex(x => x[`elective-name`] === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`elective-grades.${Index}.elective-grade`]: value}},
        { returnOriginal: false }
    ]), res
}