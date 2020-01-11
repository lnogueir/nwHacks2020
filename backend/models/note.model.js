const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    format: { type: String },
    authorId: { type: String },
    data: { type: String },
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;