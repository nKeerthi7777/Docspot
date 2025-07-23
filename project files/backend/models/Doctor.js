const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: String
  },
  fee: {
    type: Number
  },
  availableDays: {
    type: [String]
  },
  availableTime: {
    type: String
  },
  type: {
    type: String,
    default: 'doctor'
  }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
