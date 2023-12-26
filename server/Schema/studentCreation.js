import mongoose from'mongoose';
import Student from './mongoSchema.js'
import dotenv from "dotenv";
dotenv.config()
mongoose.connect(process.env.MONGO_URI)

class Students{
    constructor(
        name, email, password, sharePin, privacy, grade_level, school, fgrades, sophgrades, jgrades, sengrades, electiveNames, electiveGrades, clubNames, clubDescs, jobNames, jobDescs, communityServiceName, communityServiceDesc, communityServiceHours, communityServiceDate, sportsName,
        sportsDesc, sportAwards, artsName, artsDesc, artsAwards
        ){
        let grades = this.setGrades(fgrades, sophgrades, jgrades, sengrades)
        let communityService = this.setCommunityService(
            communityServiceName, communityServiceDesc, communityServiceHours, communityServiceDate
        );
        Object.assign(this, {
            name, 
            email,
            password,
            "share-pin": sharePin,
            "private": privacy || false,
            grade_level, 
            school, 
            "freshman-grades": grades[0], 
            "sophomore-grades": grades[1],
            "junior-grades": grades[2],
            "senior-grades": grades[3],
            "elective-grades": this.setElectives(electiveNames, electiveGrades),
            "clubs": this.setClubs(clubNames, clubDescs),
            "work": this.setJobs(jobNames, jobDescs),
            "community-service": communityService,
            "sports": this.setSports(sportsName, sportsDesc, sportAwards),
            "perfrorming-arts": this.setArts(artsName, artsDesc, artsAwards)
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
    setElectives(cn=null, cd=null){
        let clubs = [];
        if((cn.length == cd.length) && (Array.isArray(cn)) && (Array.isArray(cd))){
            for(let i=0; i<cd.length; i++){
                let obj = {
                    "name": cn[i],
                    "grade": cd[i]
                }
                clubs.push(obj)
            }
        }else{
            return this && []
        }
        return this && clubs
    }

    setClubs(cn=null, cd=null){
        let clubs = [];
        if((cn.length == cd.length) && (Array.isArray(cn)) && (Array.isArray(cd))){
            for(let i=0; i<cd.length; i++){
                let obj = {
                    "name": cn[i],
                    "desc": cd[i]
                }
                clubs.push(obj)
            }
        }else{
            return this && []
        }
        return this && clubs
    }
    setJobs(jn=null, jd=null){
        let jobs = [];
        if((jn.length == jd.length) && (Array.isArray(jn)) && (Array.isArray(jd) && Array.isArray(jt))){
            for(let i=0; i<jn.length; i++){
                let obj = {
                    "company": jn[i],
                    "desc": jd[i],
                }
                jobs.push(obj)
            }
        }else{
            return this && []
        }
        return this && jobs
    }
    setCommunityService(csn=null, csd=null, csh=null, cst=null){
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
            return this && []
        }
        return this && community
    }
    setSports(jn=null, jd=null, jt=null){
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
            return this && []
        }
        return this && jobs
    }
    setArts(jn=null, jd=null, jt=null){
        let jobs = [];
        if((jn.length == jd.length) && (Array.isArray(jn)) && (Array.isArray(jd) && Array.isArray(jt))){
            for(let i=0; i<jn.length; i++){
                let obj = {
                    "performing-art": jn[i],
                    "desc": jd[i], 
                    "awards/achievments": jt[i]
                }
                jobs.push(obj)
            }
        }else{
            return this && []
        }
        return this && jobs
    }
}

export async function createStudent(
    name, email, password, sharePin, privacy, grade, school, grade_1, grade_2, grade_3, grade_4, electiveNames, electiveGrades, clubNames, clubDescs, jobNames, jobDescs, jobType, communityServiceName, communityServiceDesc, communityServiceHours, communityServiceDate, sportsName, sportsDesc, sportAwards,
    artsName, artsDesc, artsAwards
){
    try{
        let data = new Students(
            name, email, password, sharePin, privacy, 
            grade, school, grade_1, 
            grade_2, grade_3, grade_4, electiveNames, 
            electiveGrades, clubNames, 
            clubDescs, jobNames, jobDescs, jobType,
            communityServiceName, communityServiceDesc, 
            communityServiceHours, communityServiceDate,
            sportsName, sportsDesc, sportAwards,
            artsName, artsDesc, artsAwards
        )
        let studentObject = new Student(data)
        await studentObject.validate()
        await studentObject.save();
        console.log("Student created");
    }catch(e){
        console.log(e)
    }
    
}