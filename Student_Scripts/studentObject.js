export class Student{
    constructor(name, grade_level, school, fgrades, sophgrades, jgrades, sengrades){
        let grades = this.setGrades(fgrades, sophgrades, jgrades, sengrades)
        Object.assign(this, {
            name, 
            grade_level, 
            school, 
            "freshman-grades": grades[0], 
            "sophmore-grades": grades[1],
            "junior-grades": grades[2],
            "senior-grades": grades[3],
        });
    }
    setGrades(f = [], so = [], j = [], se = []) {
        const subjects = ["math", "science", "english", "history"];
        const allGrades = [f, so, j, se];
        const grades = [];

        allGrades.forEach(gradesArray => {
        const gradeObject = {};
        subjects.forEach((subject, index) => {
            gradeObject[subject] = gradesArray[index] || "N/A";
        });
        grades.push(gradeObject);
        });

        return this && grades;
    }
}