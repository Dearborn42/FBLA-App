import Student  from '../Schema/mongoSchema.js';
import { hashPassword } from '../Middleware/login.js';
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

export async function formatFOAU(info, res){
    try{
        const result = await Student.findOneAndUpdate(
            info[0],
            info[1],
            {new:true}
        );
        if (result) return res.status(200).json({success: true});
        return res.status(404).json({success: false});
    }catch(e){
        res.status(500).json({success: false, error: e.message});
    }
}

export async function updateStudent(req, res){
    const {type} = req.params;
    const {value} = req.body
    const decodedToken = jwt.verify(req.session.user.token, process.env.SECRET_KEY);
    if(type === 'password'){
        await formatFOAU([
            { "email": req.session.user.email },
            { $set: { [`${type}`]: await hashPassword(value) } }
        ], res)
    }else{
        await formatFOAU([
            { "email": req.session.user.email },
            { $set: { [`${type}`]: value } }
        ], res)
    }
}


/*
await createStudent(Fill in at least Full Name, grade, and school)
await createStudent("Andrew Murphy", 12, "Thunderbird");
await createStudent(
    "Andrew Murphy", "amurph068@west-mec.org", "testPassword", 1234567, true, 12, "Thunderbird", 
    [89, 90, 87, 91], [79, 43, 67, 80], [82, 83, 84, 85], [90, 96, 97, 99], 
    ["spanish", "gym"], [91, 84], 
    ["theater", "speech and debate"], ["this is the theater decs", "this is the speech and debate desc"], 
    ["Five Guys", "Target", "Walmart"], 
    ["I was a crew member that cooked and prepped food", "I was a stocker and a cashier", "I was a cashier and stocker"], 
    ["Job", "Internship", "Organizational partnership"],
    ["Bikes For Foster Kids", "Canned Food Donations", "Campsite Cleaning"],
    ["Refurbished bikes for foster kids", "Put up flyers and then collected canned food", "Cleaned and fixed campsites"],
    [12, 6, 7],
    ["12/2/2022 - 1/5/2022", "8/17/2023 - 8/19/2023", "8/7/2022 - 8/9/2022"],
    ["football", "chess", "wrestling"],
    ["I was a linebacker", "I participated in the intermidiet division", "I was in the middle weight class"],
    ["Me and my team made it to nationals and got 2nd", "My elo was 1800 and I won state", "I won state and made it to nationals"],
    ["3-d art"],
    ["We made scultpures"],
    ["Won the state champinon art competition"]
);






await updateLetterGrades(
    String:"Full name of student", 
    String:"name of grade level", 
    String:" Name of class", 
    Number: new grade
):
await updateLetterGrades("Jonathan Lam", "freshman", "math", 98);

*/