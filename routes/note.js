const router = require('express').Router()
let Course = require('../models/course.model');
let Lecture = require('../models/lecture.model');
let Note = require('../models/note.model');
let User = require('../models/user.model')

//Note get request
router.route('/:id').get( (req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Note delete request
//Performs: a delete of the note with the specified id
//Returns: a confirmation
router.route('/:id').delete( (req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(note => res.json('Note Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;