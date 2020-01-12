const router = require('express').Router()
let User = require('../models/user.model');

//User get request
//Returns: the user data of the lecture with the given id
//  in JSON format
router.route('/:id').get( (req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;