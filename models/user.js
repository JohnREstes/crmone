// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  profileImage: String,
  notifications: [
    {
      message: { type: String, required: true },
      type: { type: String, required: true },
      read: { type: Boolean, default: false },
      data: {
        requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
