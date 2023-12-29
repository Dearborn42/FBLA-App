import bcrypt from 'bcrypt';
import mongoose from "mongoose"
const { Schema } = mongoose

const stringCheck = {
    type: String, 
    validate: {validator: (value) => {return (typeof value === 'string')}}
}



const studentSchema = new Schema({
    "name": { ...stringCheck, required: true, trim: true},
    "email":{ ...stringCheck, required: true, trim: true, unique: true},
    "password": { ...stringCheck, required: true, trim: true, unique: true},
    "share-pin": { ...stringCheck, required: true, trim: true},
    "private": {
        type: Boolean, 
        validate: {validator: (value) => {return (typeof value === 'boolean')}}, 
        required: true,
    },
    "grade_level": { ...stringCheck, required: true, trim: true}, 
    "school": { ...stringCheck, required: true, trim: true}, 
    "freshman-grades": {
        type: Array,
        validate: {validator: (value) => value.every(x => x.name != "" && x.grade != "")}
    }, 
    "sophomore-grades": {
        type: Array,
        validate: {validator: (value) => value.every(x => x.name != "" && x.grade != "")}
    },
    "junior-grades": {
        type: Array,
        validate: {validator: (value) => value.every(x => x.name != "" && x.grade != "")}
    },
    "senior-grades": {
        type: Array,
        validate: {validator: (value) => value.every(x => x.name != "" && x.grade != "")}
    },
    "clubs": {
        type: Array,
        validate: {validator: (value) => value.every(x => x.name != "" && x.desc != "")}
    },
    "work": {
        type: Array,
        validate: {validator: (value) => value.every(x => x.company != "" && x.desc != "")}
    },
    "community-service": { 
        type: Array,
        validate: {validator: (value) => value.every(
            x => x.name != "" && x.desc != "" && x.hours != ""
        )}
    },
    "sports": { 
        type: Array,
        validate: {validator: (value) => value.every(
            x => x.name != "" && x.desc != "" && x.award != ""
        )}
    },
    "perfrorming-arts": { 
        type: Array,
        validate: {validator: (value) => value.every(
            x => x.name != "" && x.desc != "" && x.award != ""
        )}
     },
}, {  database: 'ClusterDB', collection: 'students'})

studentSchema.method("validPassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const Student = mongoose.model('Student', studentSchema);

export default Student;