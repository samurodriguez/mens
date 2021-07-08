const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
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
