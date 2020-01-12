const router = require('express').Router()
let Note = require('../models/note.model');

//Course get request
//Returns: the lecture data of the lecture with the given id
//  in JSON format
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

//Note add request
//Performs: an addition of a note with the given details
//Returns: a confirmation
router.route('/add').post((req, res) => {
    const format = "pdf";
    const authorId = req.body.authorId;
    const data = "some content";

    const newNote = new Note({
        format,
        authorId,
        data,
    });

    newNote.save()
        .then(() => res.json('Note Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;