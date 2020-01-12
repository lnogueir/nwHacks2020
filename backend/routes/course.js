const router = require('express').Router()
let Course = require('../models/course.model');

//Course get request
//Returns: the course data of the course with the given id
//  in JSON format
router.route('/:id').get( (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Course delete request
//Performs: a delete of the course with the specified id
//Returns: a confirmation
router.route('/:id').delete( (req, res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(course => res.json('Course Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Course add request
//Performs: an addition of a course with the given details
//Returns: a confirmation
router.route('/add').post((req, res) => {
    const courseCode = req.body.courseCode;
    const courseSemester = req.body.courseSemester;
    const courseCollege = req.body.courseCollege;
    const students = [];
    const classes = [];

    const newCourse = new Course({
        courseCode,
        courseSemester,
        courseCollege,
        students,
        classes,
    });

    newCourse.save()
        .then(() => res.json('Course Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Course update request
//Performs: an update of a course's information with the given details
//Returns: a confirmation
router.route('/update/:id').post( (req, res) => {
    Course.findById(req.params.id)
        .then(course => {
            course.courseCode = req.body.courseCode;
            course.courseSemester = req.body.courseSemester;
            course.courseCollege = req.body.courseCollege;

            exercise.save()
                .then(() => res.json('Exercise Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;