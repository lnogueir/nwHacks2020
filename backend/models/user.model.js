const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    name: { type: String },
    password: { type: String },
    courses: { type: [String] },
    notes: { type: [String] }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;