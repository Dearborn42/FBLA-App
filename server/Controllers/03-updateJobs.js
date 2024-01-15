import { formatFOAU } from "./01-updateStudent.js";

export async function addJob(req, res){
    const user = req.user;
    const {name, desc, type} = req.body;
    await formatFOAU([
        {"email": user.email},
        {$push: {"work": {
            "company": name,
            "job_desc": desc, 
            "type": type
        }}},
    ], res)
}
export async function removeJob(req, res){
    const user = req.user;
    const {name} = req.params;
    await formatFOAU([
        {"email": user.email},
        { $pull: {"work": {company: name}}},
    ], res)
}

export async function updateJobDesc(req, res){
    const user = req.user;
    const {name, field} = req.params;
    const {value} = req.body;
    const index = user.work.findIndex(x => x.company === name);
    await formatFOAU([
        {"email": user.email},
        { $set: {[`work.${index}.${field}`]: value}}
    ], res);
}
