const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lectureSchema = new Schema({
    subject: { type: String, required: true }, // What the lecture is about
    date: { type: Date, required: true },
    notes: { type: [String] }
}, {
    timestamps: true,
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;