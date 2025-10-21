/**
 * @file user.js
 * @description This file contains the schema for the user.
 * @module routes/models/user
 * 
 * @requires mongoose
 * @requires passport-local-mongoose
 * 
 * @exports module.exports
 */

// Import the necessary modules
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * @name userSchema
 * @description The schema for the user.
 * @type {mongoose.Schema}
 * 
 * @property {mongoose.Schema.Types.String} username - The username of the user.
 * @property {mongoose.Schema.Types.String} email - The email of the user.
 * @property {mongoose.Schema.Types.String} name - The name of the user.
 * @property {mongoose.Schema.Types.String} perms - The permissions of the user.
 */
const userSchema = new mongoose.Schema({
    username : {type: mongoose.Schema.Types.String, unique: true, required: true},
    email: {type : mongoose.Schema.Types.String, unique: true, required: true},  
    name: {type: mongoose.Schema.Types.String, required: true},
    perms: {type : mongoose.Schema.Types.String, required: true}
});

// Add the passport-local-mongoose plugin to the schema
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

/**
 * @name permsMap
 * @description A map of the permissions.
 * @type {object}
 */
const permsMap = {
  [process.env.ADMIN_PERM_STR]: 'admin',
  [process.env.USER_PERM_STR]: 'user',
  [process.env.EDITOR_PERM_STR]: 'editor'
};

/**
 * @name permsLabel
 * @description A virtual property that returns the label of the permission.
 * @type {string}
 */
userSchema.virtual('permsLabel').get(function () {
  return permsMap[this.perms] || 'desconocido';
});

// Configure the schema to include virtual properties when converting to JSON
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });


module.exports = mongoose.model('User', userSchema);