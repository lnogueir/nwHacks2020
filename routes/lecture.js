const router = require("express").Router();
let Course = require("../models/course.model");
let Lecture = require("../models/lecture.model");
let Note = require("../models/note.model");
let User = require("../models/user.model");
let reader = require("../readers/reader.js");

//Course get request
//Returns: the lecture data of the lecture with the given id
//  in JSON format
router.route("/:id").get((req, res) => {
  Lecture.findById(req.params.id)
    .then(lecture => res.json(lecture))
    .catch(err => res.status(400).json("Error: " + err));
});

//Lecture delete request
//Performs: a delete of the lecture with the specified id
//Returns: a confirmation
router.route("/:id").delete((req, res) => {
  Lecture.findByIdAndDelete(req.params.id)
    .then(lecture => res.json("Lecture Deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

//Lecture update request
//Performs: an update of a lecture's information with the given details
//Returns: a confirmation
router.route("/:id").post((req, res) => {
  Lecture.findById(req.params.id)
    .then(lecture => {
      lecture.subject = req.body.subject;
      lecture.date = req.body.date;

      lecture
        .save()
        .then(() => res.json("Lecture Updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/categories/:id").get((req, res) => {
  Lecture.findById(req.params.id).then(lecture => {
    res.json(lecture);
    //reader.getCategories(files).then(result => res.json(result));
  });
});

module.exports = router;
