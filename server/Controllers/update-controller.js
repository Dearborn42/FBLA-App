import { formatFOAU } from "./01-updateStudent.js";


export async function add(req, res){
    const {field} = req.params;
    const user = req.user;
    await formatFOAU([
        {"email": user.email},
        {$push: {[field]: req.body}}
    ], res)
}

export async function remove(req, res){
    const {name, field} = req.params;
    const user = req.user;
    await formatFOAU([
        {"email": user.email},
        { $pull: {[field]: {name: name}}}
    ], res)
}

export async function update(req, res){
    const user = req.user;
    const {name, area, field} = req.params;
    const {value} = req.body;
    const Index = user[field].findIndex(x => x["name"] === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`${field}.${Index}.${area}`]: value}}
    ], res)
}