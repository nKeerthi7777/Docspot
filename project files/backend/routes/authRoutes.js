const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      isDoctor: false,
      type: 'user'
    });

    const savedUser = await user.save();

    const token = jwt.sign({ id: savedUser._id, role: 'user' }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: savedUser, role: 'user' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    const role = user.isDoctor ? 'doctor' : user.type === 'admin' ? 'admin' : 'user';
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);

    res.json({ token, user, role });
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
});

module.exports = router;
