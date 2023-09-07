import mongoose from "mongoose"
const { Schema } = mongoose

const stringCheck = {
    type: String, 
    validate: {validator: (value) => {return (typeof value === 'string')}}
}

const numCheck = {
    type: Number, 
    validate: {validator: (value) => {return (typeof value === 'number')}}
}

const letterGradeCheck = {
    type: mongoose.Schema.Types.Mixed,
    validate: {validator: (value) => {return (typeof value === 'number' || typeof value === 'string')}}
}

const listWithObjValidator = {
    validate: {
        validator: (value) => {
            value.map(x => {
                x.validate();
            })
        }
    }
}

const gradeSchema = new Schema({
    "math": letterGradeCheck,
    "science": letterGradeCheck,
    "english": letterGradeCheck,
    "history": letterGradeCheck,
})

const electiveGradesSchema = new Schema([
    {
        "elective-name": stringCheck,
        "elective-grade": numCheck
    }
])

const clubsSchema = new Schema([
    {
        "club-name": stringCheck,
        "club-desc": stringCheck
    }
])

const workSchema = new Schema([
    {
        "company": stringCheck,
        "job_desc": stringCheck,
        "type": stringCheck,
    }
])

const communityServiceSchema = new Schema([
    {    
        "service-name": stringCheck,
        "service-desc": stringCheck,
        "service-hours": numCheck,
        "service-date": stringCheck
    }
])

const sportsSchema = new Schema([
    {
        "sport": stringCheck,
        "sport-desc": stringCheck,
        "awards/achievments": stringCheck
    }
])

const artSchema = new Schema([
    {
        "performing-art": stringCheck,
        "desc": stringCheck,
        "awards/achievments": stringCheck
    }
])


const studentSchema = new Schema({
    "name": { ...stringCheck, required: true, trim: true},
    "email":{ ...stringCheck, required: true, trim: true, unique: true},
    "password": { ...stringCheck, required: true, trim: true, unique: true},
    "share-pin": { ...numCheck, required: true, trim: true},
    "private": {
        type: Boolean, 
        validate: {validator: (value) => {return (typeof value === 'boolean')}}, 
        required: true,
    },
    "grade_level": { ...numCheck, required: true, trim: true}, 
    "school": { ...stringCheck, required: true, trim: true}, 
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
    "elective-grades": { type: electiveGradesSchema, ...listWithObjValidator },
    "clubs": { type: clubsSchema, ...listWithObjValidator },
    "work": { type: workSchema, ...listWithObjValidator },
    "community-service": { type: communityServiceSchema, ...listWithObjValidator },
    "sports": { type: sportsSchema, ...listWithObjValidator },
    "perfrorming-arts": { type: artSchema, ...listWithObjValidator },
})

const student = mongoose.model('Student', studentSchema);

export default student;