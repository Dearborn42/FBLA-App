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
                    let name = typeof x["name"] === "string";
                    let grade = typeof x["grade"] === "number"
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
                    let name = typeof x["name"] === "string";
                    let desc = typeof x["desc"] === "string";
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
                    let desc = typeof x["desc"] === "string";
                    return company && desc;
                })
            }
        }
    },
    "community-service": { 
        type: Array, 
        validate: {
            validator: (value) => {
                value.every(x => {
                    let name = typeof x["name"] === "string";
                    let desc = typeof x["desc"] === "string";
                    let hours = typeof x["hours"] === "number";
                    let date = typeof x["date"] === "string";
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
                    let sport = typeof x["name"] === "string";
                    let desc = typeof x["desc"] === "string";
                    let awards = typeof x["award"] === "string";
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
                    let name = typeof x["name"] === "string";
                    let desc = typeof x["desc"] === "string";
                    let awards = typeof x["award"] === "string";
                    return name && desc && awards
                })
            }
        }
     },
}, {  database: 'ClusterDB', collection: 'students'})

studentSchema.method("validPassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const Student = mongoose.model('Student', studentSchema);

export default Student;