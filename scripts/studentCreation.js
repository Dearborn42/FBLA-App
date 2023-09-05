import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();
const client = await MongoClient.connect(process.env.MONGO);
const collection = client.db('ClusterDB').collection('students');

class Student{
    constructor(
        name, grade_level, school, fgrades, sophgrades, jgrades, sengrades, electiveNames, electiveGrades, clubNames, clubDescs, jobNames, jobDescs, jobType, communityServiceName, communityServiceDesc, communityServiceHours, communityServiceDate, sportsName,
        sportsDesc, sportAwards
        ){
        let grades = this.setGrades(fgrades, sophgrades, jgrades, sengrades)
        let communityService = this.setCommunityService(
            communityServiceName, communityServiceDesc, communityServiceHours, communityServiceDate
        );
        Object.assign(this, {
            name, 
            grade_level, 
            school, 
            "freshman-grades": grades[0], 
            "sophomore-grades": grades[1],
            "junior-grades": grades[2],
            "senior-grades": grades[3],
            "elective-grades": this.setClubs(electiveNames, electiveGrades),
            "clubs": this.setClubs(clubNames, clubDescs),
            "work": this.setJobs(jobNames, jobDescs, jobType),
            "community-service": communityService,
            "sports": this.setSports(sportsName, sportsDesc, sportAwards)
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

    setClubs(cn, cd){
        let clubs = [];
        if((cn.length == cd.length) && (Array.isArray(cn)) && (Array.isArray(cd))){
            for(let i=0; i<cd.length; i++){
                let obj = {[cn[i]]: cd[i]}
                clubs.push(obj)
            }
        }else{
            return this && "N/A"
        }
        return this && clubs
    }
    setJobs(jn, jd, jt){
        let jobs = [];
        if((jn.length == jd.length) && (Array.isArray(jn)) && (Array.isArray(jd) && Array.isArray(jt))){
            for(let i=0; i<jn.length; i++){
                let obj = {
                    "company": jn[i],
                    "job_desc": jd[i], 
                    "type": jt[i]
                }
                jobs.push(obj)
            }
        }else{
            return this && "N/A"
        }
        return this && jobs
    }
    setCommunityService(csn, csd, csh, cst){
        let community = [];
        if(
            (csn.length == csd.length && csd.length === csh.length && csh.length === cst.length) &&
            (Array.isArray(csd) && Array.isArray(csh) && Array.isArray(cst) && Array.isArray(csn))
            ){
            for(let i=0; i<csn.length; i++){
                let obj = {
                    "service-name": csn[i],
                    "service-desc": csd[i], 
                    "service-hours": csh[i],
                    "service-date": cst[i]
                }
                community.push(obj)
            }
        }else{
            return this && "N/A"
        }
        return this && community
    }
    setSports(jn, jd, jt){
        let jobs = [];
        if((jn.length == jd.length) && (Array.isArray(jn)) && (Array.isArray(jd) && Array.isArray(jt))){
            for(let i=0; i<jn.length; i++){
                let obj = {
                    "sport": jn[i],
                    "sport-desc": jd[i], 
                    "awards/achievments": jt[i]
                }
                jobs.push(obj)
            }
        }else{
            return this && "N/A"
        }
        return this && jobs
    }
}

export async function createStudent(
    name, grade, school, grade_1, grade_2, grade_3, grade_4, electiveNames, electiveGrades, clubNames, clubDescs, jobNames, jobDescs, jobType, communityServiceName, communityServiceDesc, communityServiceHours, communityServiceDate, sportsName, sportsDesc, sportAwards
){
    try{
        let student = new Student(
        name, grade, school, grade_1, 
        grade_2, grade_3, grade_4, electiveNames, 
        electiveGrades, clubNames, 
        clubDescs, jobNames, jobDescs, jobType,
        communityServiceName, communityServiceDesc, 
        communityServiceHours, communityServiceDate,
        sportsName, sportsDesc, sportAwards
        );
        await collection.insertOne(student)
        console.log("Passed");
    }catch(e){
        console.log(e)
    }
    
}