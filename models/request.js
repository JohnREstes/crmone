// models/request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  id: Number,
  type: String,
  name: String,
  tag: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deadline: Date,
  status: String,
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
