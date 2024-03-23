
const mongoose = require('mongoose')

const Joi = require('joi')

const {categorySchema} = require('./categoriesModel')


// create the schema
const courseSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true,
        trim: true,
        minlength: 5, 
        maxlength: 255 
    },
    // embedding one schema into another schema
    category: {
        type: categorySchema,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }

});

// create the model
const Course = new mongoose.model('Course', courseSchema);


function validateData(course) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        categoryId: Joi.string().required(),
        creator: Joi.string().min(5).required(),
        rating: Joi.number().min(0).required()
    });

    return schema.validate(course);
}

exports.Course = Course
exports.validate = validateData

