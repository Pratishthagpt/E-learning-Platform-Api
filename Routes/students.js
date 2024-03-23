const express = require('express')
const {Student, validate} = require('../models/studentsModel')

const router = express.Router()


// GET Request
router.get('/', async (req, res) => {
    let students = await Student.find();
    res.send(students);
});


// POST Request
router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const student = new Student({
        name: req.body.name,
        isEnrolled: req.body.isEnrolled,
        email: req.body.email,
        phone: req.body.phone
    })

    await student.save();
    res.send(student);
});


// PUT Request
router.put('/:id', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const student = await Student.findByIdAndUpdate(
        req.params.id, 
        { 
            name: req.body.name,
            isEnrolled: req.body.isEnrolled,
            email: req.body.email,
            phone: req.body.phone 
        }, 
        { new: true }
    );

    if (!student) {
        return res.status(404).send('The student with the given ID does not exist.');
    }

    res.send(student);
});



// // DELETE Request
router.delete('/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id)
    if (!student) {
        return res.status(404).send('The student with the given ID does not exist.');
    }

    res.send(student);
})


// // GET one student
router.get('/:id', async (req, res) => {
    const student = await Student.findById(req.params.id)
    if (!student) {
        return res.status(404).send('The student with the given ID does not exist.')
    }
    res.send(student);
})


module.exports = router