const router = require('express').Router()
let Lecture = require('../models/lecture.model');

//Course get request
//Returns: the lecture data of the lecture with the given id
//  in JSON format
router.route('/:id').get( (req, res) => {
    Lecture.findById(req.params.id)
        .then(lecture => res.json(lecture))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Lecture delete request
//Performs: a delete of the lecture with the specified id
//Returns: a confirmation
router.route('/:id').delete( (req, res) => {
    Lecture.findByIdAndDelete(req.params.id)
        .then(lecture => res.json('Lecture Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Lecture add request
//Performs: an addition of a lecture with the given details
//Returns: a confirmation
router.route('/add').post((req, res) => {
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
});

//Lecture update request
//Performs: an update of a lecture's information with the given details
//Returns: a confirmation
router.route('/update/:id').post( (req, res) => {
    Lecture.findById(req.params.id)
        .then(lecture => {
            lecture.subject = req.body.subject;
            lecture.date = req.body.date;

            exercise.save()
                .then(() => res.json('Exercise Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;