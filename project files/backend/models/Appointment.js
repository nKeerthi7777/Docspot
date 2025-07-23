const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    doctorInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'pending', // can be: pending, approved, rejected
    },
    document: {
      type: String, // filename of uploaded document
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
