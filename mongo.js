import {createStudent} from './Student_Scripts/studentCreation.js';
import {updateName, updateGradeLvl, updateSchool, updateLetterGrades, updateClubsDesc} from './Student_Scripts/updateStudent.js'


/*await createStudent(Fill in at least Full Name, grade, and school)
await createStudent("Andrew Murphy", 12, "Thunderbird");
await createStudent("Andrew Murphy", 12, "Thunderbird", [89, 90, 87, 91], [79, 43, 67, 80], [82, 83, 84, 85], [90, 96, 97, 99], ["theater", "speech and debate"], ["this is the theater decs", "this is the speech and debate desc"]);

await updateName(
    String:"Full name of student", 
    String:"Full new name of student"
);
await updateName("Andrew Murphy", "Jonathan lam");

await updateGradeLvl(
    String:"Full name of student", 
    Number: new grade level
);
await updateGradeLvl("Jonathan lam", 10);

await updateSchool(
    String:"Full name of student", 
    String:"Full new name of School"
);
await updateSchool("Jonathan lam", "O'Connor");

await updateLetterGrades(
    String:"Full name of student", 
    String:"name of grade level", 
    String:" Name of class", 
    Number: new grade
):
await updateLetterGrades("Jonathan lam", "freshman", "math", 98);
*/

await updateClubsDesc("Jonathan Lam", "theater", "This is the test theater desc")