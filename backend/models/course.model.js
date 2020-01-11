const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseCode: { type: String, required: true },
    courseSemester: { type: String, required: true }, //maybe define a new type
    courseCollege: { type: String, required: true },
    students: {type: [String], required: true },
    classes: { type: [String], required: true }
}, {
    timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;