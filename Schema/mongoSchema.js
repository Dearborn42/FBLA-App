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

const clubsSchema = new mongoose.Schema([
    {
        dynamicProperty: String
    }
])

const workSchema = new mongoose.Schema([
    {
        "company": String,
        "job_desc": String,
        "type": String,
    }
])

const communityServiceSchema = new mongoose.Schema([
    {
        
        "service-name": String,
        "service-desc": String,
        "service-hours": Number,
        "service-date": String
    }
])

const sportsSchema = new mongoose.Schema([
    {
        "sport": String,
        "sport-desc": String,
        "awards/achievments": String
    }
])

const artSchema = new mongoose.Schema([
    {
        "performing-art": String,
        "desc": String,
        "awards/achievments": String
    }
])


const studentSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
        trim: true
    },
    "email":{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    "password": {
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
    "grade_level": {
        type: Number,
        required: true,
        trim: true
    }, 
    "school": {
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
                if(typeof value === Array && value.length === 0)
                    return true
                else
                    return electiveGradesSchema.validate(value)
            }
        }
    },
    "clubs": {
        type: mongoose.Schema.Types.Mixed,
        validate: {
            validator: (value) => {
                if(typeof value === Array && value.length === 0)
                    return true
                else
                    return clubsSchema.validate(value)
            }
        }
    },
    "work": {
        type: mongoose.Schema.Types.Mixed,
        validate: {
            validator: (value) => {
                if(typeof value === Array && value.length === 0)
                    return true
                else
                    return workSchema.validate(value)
            }
        }
    },
    "community-service": {
        type: mongoose.Schema.Types.Mixed,
        validate: {
            validator: (value) => {
                if(typeof value === Array && value.length === 0)
                    return true
                else
                    return communityServiceSchema.validate(value)
            }
        }
    },
    "sports": {
        type: mongoose.Schema.Types.Mixed,
        validate: {
            validator: (value) => {
                if(typeof value === Array && value.length === 0)
                    return true
                else
                    return sportsSchema.validate(value)
            }
        }
    },
    "perfrorming-arts": {
        type: mongoose.Schema.Types.Mixed,
        validate: {
            validator: (value) => {
                if(typeof value === Array && value.length === 0)
                    return true
                else
                    return artSchema.validate(value)
            }
        }
    },
})


const student = mongoose.model('Student', studentSchema);

export default student;