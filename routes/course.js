const router = require('express').Router()
let Course = require('../models/course.model');
let Lecture = require('../models/lecture.model');
let Note = require('../models/note.model');
let User = require('../models/user.model')

//Course create request
//Performs: an addition of a course with the given details
//Returns: a confirmation
router.route('/create').post( (req, res) => {
    console.log(req.body)

    const courseCode = req.body.courseCode;
    const courseSemester = req.body.courseSemester;
    const courseCollege = req.body.courseCollege;
    const students = [];
    const lectures = [];

    students.push(req.user.username)

    const newCourse = new Course({
        courseCode,
        courseSemester,
        courseCollege,
        students,
        lectures,
    });

    newCourse.save()
        .then(() => {
            User.findOne( { 'username': req.user.username } )
                .then( user => {
                    user.courses.push(newCourse._id);
                    user.save()
                        .then(() => res.json('User Updated!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Course join request
//Params: id = course id
//Adds a student to a course object, adds a course to a student object
router.route('/join/:id').get( (req, res) => {
    Course.findById(req.params.id)
        .then(course => {
            course.students.push(req.user.username)
            course.save()
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    
    User.findOne( { 'username': req.user.username } )
        .then(user => {
            user.courses.push(req.params.id)
            user.save()
                .then(() => res.json('User Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

//Course create join link request
//Params: id = course id
//Creates a join link for the given course
router.route('/link/:id').get( (req, res) => {
    res.send("<a href='http://localhost:5000/course/join/" + req.params.id + "'>Click Me </a>");
})

//Course leave request
//Params: id = course id
//Removes a student to a course object, removes a course to a student object
router.route('/leave/:id').get( (req, res) => {
    Course.findById(req.params.id)
        .then(course => {
            course.students = course.students.filter(e => e !== req.user.username)
            course.save()
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    
    User.findOne( { 'username': req.user.username } )
        .then(user => {
            user.courses = user.courses.filter(e => e !== req.params.id)
            user.save()
                .then(() => res.json('User Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

//Lecture add request
//Params: id = course id
//Performs: an addition of a lecture with the given details
//Returns: a confirmation
router.route('/createLecture/:id').post( (req, res) => {
    const subject = req.body.subject;
    const date = req.body.date;
    const notes = [];

    const newLecture = new Lecture({
        subject,
        date,
        notes,
    });

    newLecture.save()
        .then(() => res.json('Lecture Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
    Lecture.findOne({
        'subject': subject,
        'date': date,
        'notes': notes
    })
        .then(lecture => {
            Course.findById(req.params.id)
            .then(course => {
                course.lectures.push(lecture._id)
                course.save()
                    .then(() => res.json('Course Updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

//Course get request
//Params: id = course id
//Returns: the course data of the course with the given id
//  in JSON format
router.route('/:id').get( (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Course update request
//Params: id = course id
//Performs: an update of a course's information with the given details
//Returns: a confirmation
router.route('/:id').post( (req, res) => {
    Course.findById(req.params.id)
        .then(course => {
            course.courseCode = req.body.courseCode;
            course.courseSemester = req.body.courseSemester;
            course.courseCollege = req.body.courseCollege;

            course.save()
                .then(() => res.json('Course Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Course delete request
//Params: id = course id
//Performs: a delete of the course with the specified id
//Returns: a confirmation
router.route('/:id').delete( (req, res) => {
    Course.findByIdAndDelete(req.params.id)
        .then(course => res.json('Course Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;