// models/request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  passportNumber: { type: String, required: true },
  passportCountry: { type: String, required: true },
  passportExpiry: { type: Date, required: true },
  frequentFlierNumbers: [
    {
      airline: String,
      number: String
    }
  ],
  creditCard: {
    number: { type: String, required: true },
    expiry: { type: String, required: true },
    cvv: { type: String, required: true }
  },
  trips: [
    {
      destination: String,
      startDate: Date,
      endDate: Date,
      details: String
    }
  ],
  notes: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
