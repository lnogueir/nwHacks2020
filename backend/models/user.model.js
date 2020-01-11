const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String },
    courses: { type: [String] },
    notes: { type: [String] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;