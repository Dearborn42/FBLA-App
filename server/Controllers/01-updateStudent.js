import Student  from '../Schema/mongoSchema.js'
const client = await MongoClient.connect(MONGO);
const collection = client.db('ClusterDB').collection('students');

export async function formatFOAU(info){
    try{
        const result = await Student.findOneAndUpdate(
            info[0],
            info[1],
            info[2]
        );
        if (result.value) console.log("Passed");
        else console.log("Student doesn't exist or mis-spelled name");
    }catch(e){
        console.error("Error:", e);
    }
}


// await updateName(
//     String:"Full name of student", 
//     String:"Full new name of student"
// );
// await updateName("Andrew Murphy", "Jonathan Lam");
export async function updateName(name, new_value) {
    await formatFOAU([
        { "name": name },
        { $set: { "name": new_value } },
        { returnOriginal: false }
    ])
}


// await updateGradeLvl(
//     String:"Full name of student", 
//     Number: new grade level
// );
// await updateGradeLvl("Jonathan Lam", 10);
export async function updateGradeLvl(name, new_value) {
    await formatFOAU([
        {"name": name}, 
        { $set: { "grade_level": Number(new_value) }},
        { returnOriginal: false }
    ])
}




// await updateEmail(
//     String:"Full name of student",
//     String:"Password",
//     String:"New Email"
// )
// await updateEmail("Andrew Murphy", "testPassword", "jlam456@west-mec.com")
export async function updateEmail(name, password, newEmail){
    const studentDocument = await Student.findOne({ "name": name });
    if(password === studentDocument.password){
        await formatFOAU([
            {"name": name},
            { $set: { "email": newEmail}},
            { returnOriginal: false }
        ])
    }else{
        console.log("Please enter right password");
    }
}



// await updatePassword(
//     String:"Full name of student",
//     String:"Email",
//     String:"Password",
//     String:"New Password"
// )
// await updatePassword("Andrew Murphy", "jlam456@west-mec.com", "testPassword", "passwordTest");
export async function updatePassword(name, email, Oldpassword, newPassword){
    const studentDocument = await Student.findOne({ "name": name });
    if(Oldpassword === studentDocument.password && email === studentDocument.email){
        await formatFOAU([
            {"name": name},
            { $set: { "password": newPassword}},
            { returnOriginal: false }
        ])
    }else{
        console.log("Please enter right password or email");
    }
}

export async function updateSharePin(name, password, email, newSharePin){
    const studentDocument = await Student.findOne({ "name": name });
    if(password === studentDocument.password && email === studentDocument.email){
        await formatFOAU([
            {"name": name},
            { $set: { "share-pin": newSharePin}},
            { returnOriginal: false }
        ])
    }else{
        console.log("Please enter right password or email");
    }
}

export async function updatePrivacy(name, password, email){
    const studentDocument = await Student.findOne({ "name": name });
    if(password === studentDocument.password && email === studentDocument.email){
        await formatFOAU([
            {"name": name},
            { $set: { "private": !studentDocument.private}},
            { returnOriginal: false }
        ])
    }else{
        console.log("Please enter right password or email");
    }
}


// await updateSchool(
//     String:"Full name of student", 
//     String:"Full new name of School"
// );
// await updateSchool("Jonathan Lam", "O'Connor");
export async function updateSchool(name, new_value) {
    await formatFOAU([
        {"name": name}, 
        { $set: { "school": new_value}},
        { returnOriginal: false }
    ])
}

export async function updateLetterGrades(name, grade_lvl, subject, new_value) {
    await formatFOAU([
        { "name": name }, 
        { $set: { [`${grade_lvl}-grades.${subject}`]: new_value } },
        { returnOriginal: false }
    ])
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