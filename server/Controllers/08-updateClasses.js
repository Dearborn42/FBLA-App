import { formatFOAU } from "./01-updateStudent.js";
import Student from "../Schema/mongoSchema.js";

export async function removeClass(req, res){
    const user = req.user;
    const {name, year} = req.params;
    await formatFOAU([
        {"email": user.email},
        { $pull: {[year]: {name: name}}}
    ], res)
}

export async function addClass(req, res){
    const user = req.user;
    const {name, grade, year} = req.body
    await formatFOAU([
        {"email": user.email},
        {$push: {[year]: {"name": name, "grade": grade}}}
    ], res)
}

export async function updateClass(req, res){
    const user = req.user;
    const {name, year, field} = req.params;
    const {value} = req.body;
    const Index = user[year].findIndex(x => x[name] === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`${year}.${Index}.${field}`]: value}}
    ]), res
}