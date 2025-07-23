const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// Book appointment
router.post('/book', async (req, res) => {
  try {
    const { userId, doctorId, date, time, reason } = req.body;

    const appointment = new Appointment({
      userId,
      doctorId,
      date,
      time,
      reason
    });

    await appointment.save();
    res.status(201).send("Appointment booked successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to book appointment");
  }
});

// Get appointments for doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId })
      .populate('userId', 'name email phone')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch doctor appointments");
  }
});

// Get all appointments (for admin)
router.get('/all', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('userId', 'name email')
      .populate('doctorId', 'specialization availableTime');

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch all appointments");
  }
});

module.exports = router;
