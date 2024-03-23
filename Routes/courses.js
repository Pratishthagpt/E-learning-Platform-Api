const express = require('express')
const { Course, validate } = require('../models/coursesModel')
const {Category} = require('../models/categoriesModel')

const router = express.Router()



// GET Request
router.get('/', async (req, res) => {
    let courses = await Course.find();
    res.send(courses);
});


// POST Request
router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const category = await Category.findById(req.body.categoryId);
    if (!category) {
        return res.status(400).send('Invalid category ID.')
    }

    let course = new Course({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        creator: req.body.creator,
        rating: req.body.rating
    });

    course = await course.save();
    res.send(course);
});


// PUT Request
router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const category = await Category.findById(req.body.categoryId);
    if (!category) {
        return res.status(400).send('Invalid category ID.')
    }

    const course = await Course.findByIdAndUpdate(
        req.params.id, 
        { 
            title: req.body.title,
            category: {    
                _id: category._id,
                name: category.name
            },
            creator: req.body.creator,
            rating: req.body.rating 
        }, 
        { new: true }
    );

    if (!course) {
        return res.status(404).send('The course with the given ID does not exist.');
    }

    res.send(course);
});



// // DELETE Request
router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) {
        return res.status(404).send('The course with the given ID does not exist.');
    }

    res.send(course);
})


// // GET one category
router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) {
        return res.status(404).send('The course with the given ID does not exist.')
    }
    res.send(course);
})

module.exports = router