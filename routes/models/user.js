const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username : {type: mongoose.Schema.Types.String, unique: true, required: true},
    email: {type : mongoose.Schema.Types.String, unique: true, required: true},  
    name: {type: mongoose.Schema.Types.String, required: true},
    perms: {type : mongoose.Schema.Types.String, required: true}
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

const permsMap = {
  [process.env.ADMIN_PERM_STR]: 'admin',
  [process.env.USER_PERM_STR]: 'user',
  [process.env.EDITOR_PERM_STR]: 'editor'
};

userSchema.virtual('permsLabel').get(function () {
  return permsMap[this.perms] || 'desconocido';
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('User', userSchema);