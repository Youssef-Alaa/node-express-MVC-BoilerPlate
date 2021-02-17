const mongoose = require('mongoose');
const Strings = require('../config/strings');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: [Strings.role.member, Strings.role.editor, Strings.role.admin],
    default: Strings.role.member
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String
  },
}, 
{ timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);