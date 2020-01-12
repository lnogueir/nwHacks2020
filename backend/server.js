const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});