import mongoose from "mongoose"

const gradeSchema = new mongoose.Schema({
    "math": mongoose.Schema.Types.Mixed,
    "science": mongoose.Schema.Types.Mixed,
    "english": mongoose.Schema.Types.Mixed,
    "history": mongoose.Schema.Types.Mixed,
})

const electiveGradesSchema = new mongoose.Schema([
    {
        dynamicProperty: Number
    }
])


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    "share-pin": {
        type: Number,
        required: true,
        trim: true
    },
    "private": {
        type: Boolean,
        required: true,
    },
    grade_level: {
        type: Number,
        required: true,
        trim: true
    }, 
    school: {
        type: String,
        required: true,
        trim: true
    }, 
    "freshman-grades": {
        type: gradeSchema,
    }, 
    "sophomore-grades": {
        type: gradeSchema,
    },
    "junior-grades": {
        type: gradeSchema,
    },
    "senior-grades": {
        type: gradeSchema,
    },
    "elective-grades": {
        type: mongoose.Schema.Types.Mixed,
        validate: {
            validator: (value) => {

            }
        }
    },
    "clubs": this.setClubs(clubNames, clubDescs),
    "work": this.setJobs(jobNames, jobDescs, jobType),
    "community-service": communityService,
    "sports": this.setSports(sportsName, sportsDesc, sportAwards),
    "perfrorming-arts": this.setArts(artsName, artsDesc, artsAwards)
})