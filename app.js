const express = require('express');
const categories = require('./Routes/categories')
const students = require('./Routes/students')
const courses = require('./Routes/courses')
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://127.0.0.1/e_learningPlatform')
.then(()=>{console.log('Connection is Successful to Database')})
.catch((err) => console.log("Could not connect to mongodb", err))

app.use(express.json());
app.use('/api/categories', categories)
app.use('/api/students', students)
app.use('/api/courses', courses)



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});



