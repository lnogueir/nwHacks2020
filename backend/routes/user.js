const router = require('express').Router()
let Course = require('../models/course.model');
let Lecture = require('../models/lecture.model');
let Note = require('../models/note.model');
let User = require('../models/user.model')

//User get request
//Returns: the user data of the lecture with the given id
//  in JSON format
router.route('/:id').get( (req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;