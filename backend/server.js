const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Setup app and port
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//Passport shit
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
let User = require('./models/user.model')

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

//Connect to the database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true } );
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Database connection established")
})

const courseRouter = require('./routes/course');
const lectureRouter = require('./routes/lecture');
const noteRouter = require('./routes/note');
const userRouter = require('./routes/user');
const fileRouter = require('./routes/file');

app.use('/course', courseRouter);
app.use('/lecture', lectureRouter);
app.use('/note', noteRouter);
app.use('/user', userRouter);
app.use('/file', fileRouter);

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

app.post('/login', passport.authenticate("local", {
    successRedirect: "/user",
    failureRedirect: "/"
}), function (req, res) { })

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});