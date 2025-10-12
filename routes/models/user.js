const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email: mongoose.Schema.Types.String,
    name: mongoose.Schema.Types.String,
    perms: mongoose.Schema.Types.String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);