const mongoose = require('mongoose');

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    match: emailRegex,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
