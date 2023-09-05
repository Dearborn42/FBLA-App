import {createStudent} from './scripts/studentCreation.js';
// import {
//     updateName, updateGradeLvl, updateSchool, updateLetterGrades, 
//     updateClubsDesc, removeClub, addClub, 
//     addJob, removeJob, updateJobDesc,
//     removeElective, addElective, updateElectiveGrade,
//     updateServiceName, updateServiceDesc, updateServiceHours, updateServiceDate, removeService, addService, 
//     addSport, removeSport, updateSportName, updateSportDesc, updateSportAwards,
//     addArt, removeArt, updateArtName, updateArtDesc, updateArtAwards
// } from './scripts/01-updateStudent.js'

import { getStudents } from './scripts/studentDataCollection.js'


/*await createStudent(Fill in at least Full Name, grade, and school)
await createStudent("Andrew Murphy", 12, "Thunderbird");
await createStudent(
    "Andrew Murphy", 12, "Thunderbird", 
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
    ["Me and my team made it to nationals and got 2nd", "My elo was 1800 and I won state", "I won state and made it to nationals"]
);

await updateName(
    String:"Full name of student", 
    String:"Full new name of student"
);
await updateName("Andrew Murphy", "Jonathan Lam");

await updateGradeLvl(
    String:"Full name of student", 
    Number: new grade level
);
await updateGradeLvl("Jonathan Lam", 10);

await updateSchool(
    String:"Full name of student", 
    String:"Full new name of School"
);
await updateSchool("Jonathan Lam", "O'Connor");

await updateLetterGrades(
    String:"Full name of student", 
    String:"name of grade level", 
    String:" Name of class", 
    Number: new grade
):
await updateLetterGrades("Jonathan Lam", "freshman", "math", 98);

await updateClubDesc(
    String:"Full name of student", 
    String: "Name of club", 
    String: "New desc"
);
await updateClubsDesc("Jonathan Lam", "theater", "This is the test theater desc")

await removeClub(
    String:"Full name of student", 
    String:"Name of club"
)
await removeClub("Jonathan Lam", "speech and debate");

await addClub(
    String:"Full name of student", 
    String:"Name of club", 
    String: "Club description"
);
await addClub("Jonathan Lam", "decatholan", "This is the test");

await addJob(
    String:"Full name of student", 
    String:"Name of company", 
    String:"description", 
    String:"job type"
)
await addJob("Jonathan Lam", "Pei Wei", "I worked there as a crew member", "Job")

await removeJob(
    String:"Full name of student", 
    String:"Name of company"
);
await removeJob("Jonathan Lam", "Walmart");

await updateJobDesc(
    String:"Full name of student", 
    String:"Name of company", 
    String:"description", 
)
await updateJobDesc("Jonathan Lam", "Target", "I was a cashier and a stocker");

await addElective(
    "String: Full name of student", 
    "String: Name of elective", 
    num: number grade
);
await addElective("Jonathan Lam", "gym", 84);

await removeElective(
    "String: Full name of student", 
    "String: Name of elective"
);
await removeElective("Jonathan Lam", "gym");

await updateElectiveGrade(
    String:"Full name of student", 
    String:"Name of elective",
    Number: New Grade
)
await updateElectiveGrade("Jonathan Lam", "Digital-photography", 100);

await updateServiceName(
    String:"Full name of student",
    String:"Name of service",
    String:"New name of service"
)
await updateServiceName("Jonathan Lam", "Bikes For Foster Kids", "Test");

await updateServiceDesc(
    String:"Full name of student",
    String:"Name of service",
    String:"New desc"
)
await updateServiceDesc("Jonathan Lam", "Test", "New Desc that sucks")

await updateServiceHours(
    String:"Full name of student",
    String:"Name of service",
    Number: hours,
)
await updateServiceHours("Jonathan Lam", "Test", 18)

await updateServiceDate(
    String:"Full name of student",
    String:"Name of service",
    String:"Start date of service",
    String:"End date of service"
)
await updateServiceDate("Jonathan Lam", "Test", "12/12/12", "13/13/13")

await removeService(
    String:"Full name of student",
    String:"Name of service"
)
await removeService("Jonathan Lam", "Test");

await addService(
    String:"Full name of Student",
    String:"Name of service",
    String:"Description of service",
    Number: hours,
    String:"Start date of service",
    String:"End date of service"
)
await addService(
    "Jonathan Lam", 
    "Bikes For Foster Kids", 
    "Refurbished bikes for foster kids", 
    12, 
    "12/2/2022", 
    "1/5/2022"
)

await addSport(
    String:"Full Name of student",
    String:"Name of sport",
    String:"Sport description",
    String: "Awards/Acheivments"
)
await addSport("Jonathan Lam", "Golf", "I was the captin", "My team won reginals");

await removeSport(
    String:"Full Name of student",
    String:"Name of sport"
)
await removeSport("Jonathan Lam", "Golf"); 

await updateSportName(
    String:"Full Name of student",
    String:"Name of sport",
    String:"New name of sport"
)
await updateSportName("Jonathan Lam", "chess", "Chess");

await updateSportDesc(
    String:"Full Name of student",
    String:"Name of sport",
    String:"New desc"
)
await updateSportDesc("Jonathan Lam", "Chess", "Test description");

await updateSportAwards(
    String:"Full Name of student",
    String:"Name of sport",
    String:"New awards"
)
await updateSportAwards("Jonathan Lam", "Chess", "My Elo was 2100")

await addArt(
    String:"Full Name of student",
    String:"Name of art",
    String:"art description",
    String: "Awards/Acheivments"
)
await addArt("Jonathan Lam", "band", "I played the drums", "We won state");

await removeArt(
    String:"Full Name of student",
    String:"Name of art"
)
await removeArt("Jonathan Lam", "band");

await updateArtName(
    String:"Full Name of student",
    String:"Name of art",
    String:"New name of art"
)
await updateArtName("Jonathan Lam", "band", "art");

await updateArtDesc(
    String:"Full Name of student",
    String:"Name of art",
    String:"New desc"
)
await updateArtDesc("Jonathan Lam", "band", "I played the saxaphone");

await updateArtAwards(
    String:"Full Name of student",
    String:"Name of art",
    String:"New awards"
)
await updateArtAwards("Jonathan Lam", "band", "We won nationals");
*/


