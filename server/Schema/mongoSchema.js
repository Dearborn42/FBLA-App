import bcrypt from 'bcrypt';
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

const gradeSchema = new Schema({
    "math": letterGradeCheck,
    "science": letterGradeCheck,
    "english": letterGradeCheck,
    "history": letterGradeCheck,
})




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
    "elective-grades": {
        type: Array,
        validate: {
            validator: (value) => {
                value.every(x => {
                    let name = typeof x["elective-name"] === "string";
                    let grade = typeof x["elective-grade"] === "number"
                    return name && grade;
                })
            }
        }
    },
    "clubs": {
        type: Array,
        validate: {
            validator: (value) => {
                value.every(x => {
                    let name = typeof x["club-name"] === "string";
                    let desc = typeof x["club-desc"] === "string";
                    return name && desc;
                })
            }
        }
    },
    "work": {
        type: Array,
        validate: {
            validator: (value) => {
                value.every(x => {
                    let company = typeof x["company"] === "string";
                    let desc = typeof x["job_desc"] === "string";
                    let type = typeof x["type"] === "string";
                    return company && desc && type;
                })
            }
        }
    },
    "community-service": { 
        type: Array, 
        validate: {
            validator: (value) => {
                value.every(x => {
                    let name = typeof x["service-name"] === "string";
                    let desc = typeof x["service-desc"] === "string";
                    let hours = typeof x["service-hours"] === "number";
                    let date = typeof x["service-date"] === "string";
                    return name && desc && hours && date
                })
            }
        } 
    },
    "sports": { 
        type: Array,
        validate: {
            validator: (value) => {
                value.every(x => {
                    let sport = typeof x["sport"] === "string";
                    let desc = typeof x["sport-desc"] === "string";
                    let awards = typeof x["awards/achievments"] === "string";
                    return sport && desc && awards
                })
            }
        }
    },
    "perfrorming-arts": { 
        type: Array,
        validate: {
            validator: (value) => {
                value.every(x => {
                    let name = typeof x["performing-art"] === "string";
                    let desc = typeof x["desc"] === "string";
                    let awards = typeof x["awards/achievments"] === "string";
                    return name && desc && awards
                })
            }
        }
     },
}, {  database: 'ClusterDB', collection: 'students'})

studentSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Student = mongoose.model('Student', studentSchema);

export default Student;