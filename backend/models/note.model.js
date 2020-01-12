const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    filename: { type: String },
    filetype: { type: String },
    author: { type: String },
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;