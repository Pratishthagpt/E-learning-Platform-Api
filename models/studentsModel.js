
const mongoose = require('mongoose')

const Joi = require('joi')


// create the schema
const studentSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 4, 
        maxlength: 30 
    },
    isEnrolled: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true    
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15
    }

});

// create the model
const Student = new mongoose.model('student', studentSchema);


function validateData(student) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        isEnrolled: Joi.boolean(),
        email: Joi.string().min(15).max(50).required(),
        phone: Joi.string().min(10).max(15)
    });

    return schema.validate(student);
}

exports.Student = Student
exports.validate = validateData

