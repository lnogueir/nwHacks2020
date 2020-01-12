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

module.exports = router;