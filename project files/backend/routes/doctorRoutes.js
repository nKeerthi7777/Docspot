const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Doctor Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(400).send("Doctor not found");

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET);
    res.json({ token, role: 'doctor', doctor });
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
});

module.exports = router;
