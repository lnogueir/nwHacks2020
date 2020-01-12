const router = require('express').Router()
let Course = require('../models/course.model');
let Lecture = require('../models/lecture.model');
let Note = require('../models/note.model');
let User = require('../models/user.model')

let PDFParser = require("pdf2json");

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




//Lecture update request
//Performs: an update of a lecture's information with the given details
//Returns: a confirmation
router.route('/update/:id').post( (req, res) => {
    Lecture.findById(req.params.id)
        .then(lecture => {
            lecture.subject = req.body.subject;
            lecture.date = req.body.date;

            lecture.save()
                .then(() => res.json('Lecture Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

//Get files from lecture
//Returns: all files in lecture as json
router.route('/files/:id').get( (req, res) => {
    Lecture.findById(req.params.id)
        .then(lecture => res.json(lecture.notes))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Merge files in request and save to DB
//Returns: merged files in the note format
router.route('/merge/:id').post( (req, res) => {
    let files;
    Lecture.findById(req.params.id)
        .then(lecture_files => {
            files = lecture_files;
        })
        .catch(err => res.status(400).json('Error: ' + err));
    
    let data = "";

    files.map(file => {
        let pdfParser = new PDFParser(file,1);
        pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
        pdfParser.on("pdfParser_dataReady", pdfData => {
            data.concat(pdfParser.getRawTextContent())
            res.json(pdfParser.getRawTextContent());
        });
        return pdfParser.loadPDF(file);
    });

    const format = "pdf";
    const authorId = req.body.authorId;

    const newNote = new Note({
        format,
        authorId,
        data,
    });

    newNote.save()
        .then(() => res.json('Merged notes from lecture added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;