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