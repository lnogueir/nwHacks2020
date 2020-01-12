//==============================================
//Dependencies and Models
//==============================================
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var flash = require('express-flash')

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(flash());

//==============================================
//Connect to the database
//==============================================
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true } );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection established")
})

//==============================================
//Passport Configuration
//==============================================
let Course = require('./models/course.model');
let Lecture = require('./models/lecture.model');
let Note = require('./models/note.model');
let User = require('./models/user.model')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(require("express-session")({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==============================================
//GridFS Configuration
//==============================================
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path');

app.use(methodOverride('_method'));

let gfs;
connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('uploads')
})

const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
        return new Promise( (resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
})

const upload = multer( { storage } )

//==============================================
//User Routing
//==============================================

//User Registration Request
//Performs: User registration
//Returns: An error if failed, a confirmation if succeeded
app.post('/user/register', (req, res) => {
    User.register(new User({
        username: req.body.username,
        name: req.body.name,
        courses: [],
        notes: [],
    }),
    req.body.password,
    (err, user) => {
        if (err) {console.log(err)}
        passport.authenticate("local")(req, res, () => {
            console.log(`${req.body.username} has been registered`)
            res.json({"message": "registration successful"})
        })
    });
});

//User Login Request
//Performs: Login, session
app.post('/user/login', passport.authenticate("local"), (req, res) => { 
    res.status(200);
    User.find( { username: req.body.username } )
        .then(e => {res.json(e)})
        .catch(err => res.status(400).json('Error: ' + err));
    console.log(`User ${req.user.username} has logged in.`);
})

//User Logout Request
//Performs: Logout
app.get('/user/logout', (req, res) => {
    console.log(`User ${req.user.username} has logged out.`);
    req.logout();
    res.json({"message": "logout successful"});
});

//User Get Request
//Returns 
app.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
        .then(e => {res.json(e)})
        .catch(err => res.status(400).json('Error: ' + err));
})

//==============================================
//File upload routing
//==============================================

//Note Upload Request
//Performs: Upload of a given note, addition of note filename to Lecture and author
app.post('/lecture/upload', upload.array('file'), (req, res) => {
    req.files.map(elt => {
        let filename = elt.filename;
        let filetype = elt.contentType;
        let author = req.user.username;

        let newNote = Note({
            filename,
            filetype,
            author
        })

        newNote.save()
            .catch(err => res.status(400).json('Error: ' + err));

        Note.findOne({
            'filename': filename,
            'filetype': filetype,
            'author': author
        })
            .then(note => {
                User.findOne( { 'username': req.user.username } )
                .then(user => {
                    console.log(user);
                    user.notes.push(filename)
                    user.save()
                        .then(() => res.json('File Uploaded!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
            })
    })
})

//Note Get Request
//Returns: readable and downloadable note file
app.get('/note/:filename', (req, res) => {
    gfs.files.findOne({filename: req.params.filename}, (err, file) => {
        if (!file || file.length == 0) {
            return res.status(404).json({
                err: 'No file'
            })
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
})

//==============================================
//Routers
//==============================================
const courseRouter = require('./routes/course');
const lectureRouter = require('./routes/lecture');
const noteRouter = require('./routes/note');

app.use('/course', courseRouter);
app.use('/lecture', lectureRouter);
app.use('/note', noteRouter);

//==============================================
//Start the app!
//==============================================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});