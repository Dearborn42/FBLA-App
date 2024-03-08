import { formatFOAU } from "./01-updateStudent.js";


export async function add(req, res){
    const decodedToken = jwt.verify(req.session.token, process.env.SECRET_KEY);
    const {field} = req.params;
    await formatFOAU([
        {"email": decodedToken.user.email},
        {$push: {[field]: req.body}}
    ], res)
}

export async function remove(req, res){
    const decodedToken = jwt.verify(req.session.token, process.env.SECRET_KEY);
    const {name, field} = req.params;
    await formatFOAU([
        {"email": decodedToken.user.email},
        { $pull: {[field]: {name: name}}}
    ], res)
}

export async function update(req, res){
    const decodedToken = jwt.verify(req.session.token, process.env.SECRET_KEY);
    const {name, area, field} = req.params;
    const {value} = req.body;
    const Index = decodedToken.user[field].findIndex(x => x["name"] === name);
    await formatFOAU([
        {"email": decodedToken.user.email},
        { $set: {[`${field}.${Index}.${area}`]: value}}
    ], res)
}

