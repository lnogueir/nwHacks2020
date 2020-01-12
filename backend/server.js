//==============================================
//Dependencies
//==============================================
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//==============================================
//Setup app and port
//==============================================
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

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
var flash = require('express-flash')
app.use(flash());

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
//Routers
//==============================================
const courseRouter = require('./routes/course');
const lectureRouter = require('./routes/lecture');
const noteRouter = require('./routes/note');
const userRouter = require('./routes/user');

app.use('/course', courseRouter);
app.use('/lecture', lectureRouter);
app.use('/note', noteRouter);
app.use('/user', userRouter);

//==============================================
//Registration routing
//==============================================
app.post('/register', function (req, res) {
    User.register(new User({
        username: req.body.username,
        name: req.body.name,
        courses: [],
        notes: [],
    }), req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
            }
            passport.authenticate("local")(req, res, function () {
                res.send("successful registration")
            })
        });
});

app.post('/login', passport.authenticate("local"), function (req, res) { 
    res.status(200);
    User.find( { username: req.body.username } )
        .then(e => {res.json(e)});
})

app.get('/check', (req, res) => {
    console.log(req.session);
})

app.get("/logout", function (req, res) {
    req.logout();
    res.send("you've been logged out");
});

//==============================================
//File upload routing
//==============================================
app.post('/upload', upload.array('file'), (req, res) => {
    res.json({file: req.files});
})

app.get('/files', (req, res) => {
    gfs.files.find().toArray( (err, files) => {
        if(!files || files.length == 0) {
            return res.status(404).json({
                err: 'No files'
            })
        }
        return(res.json(files));
    })
})

app.get('/files/:filename', (req, res) => {
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
//Start the app!
//==============================================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});