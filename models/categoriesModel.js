
const mongoose = require('mongoose')

// Joi is the schema description language and data validator for Javascript
const Joi = require('joi')

// create the schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4, maxlength: 30 }
});

// create the model
const Category = new mongoose.model('category', categorySchema);


function validateData(category) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(category);
}


// for passing it to router function outside this file

exports.Category = Category
exports.categorySchema = categorySchema
exports.validate = validateData