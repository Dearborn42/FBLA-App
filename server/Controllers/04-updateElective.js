import Student from "../Schema/mongoSchema.js";
import { formatFOAU } from "./01-updateStudent.js";

export async function removeElective(name, elective){
    const studentDocument = await Student.findOne({ "name": name });
    const Index = studentDocument[`elective-grades`].findIndex(x => x[`elective-name`] === elective);
    await formatFOAU([
        {"name": name},
        { $pull: {"elective-grades": studentDocument[`elective-grades`][Index]}},
        {returnOriginal: false}
    ])
}

export async function addElective(name, electiveName, electiveGrade){
    await formatFOAU([
        {"name": name},
        {$push: {"elective-grades": {"elective-name": electiveName, "elective-grade": electiveGrade}}},
        {returnOriginal: false}
    ])
}

export async function updateElectiveGrade(name, electiveName, electiveGrade){
    const studentDocument = await Student.findOne({ "name": name });
    const Index = studentDocument["elective-grades"].findIndex(x => x[`elective-name`] === electiveName);
    await formatFOAU([
        {"name": name},
        { $set: {[`elective-grades.${Index}.elective-grade`]: electiveGrade}},
        { returnOriginal: false }
    ])
}