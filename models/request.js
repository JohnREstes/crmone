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

// const mongoose = require('mongoose');

// const requestSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['ticket', 'issue', 'bug'],
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   tag: {
//     type: String,
//     enum: ['feature', 'fix', 'ui', 'danger', 'urgent'],
//     required: true,
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   deadline: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['open', 'in progress', 'closed', 'resolved'],
//     required: true,
//   },
// });

// module.exports = mongoose.model('Request', requestSchema);
