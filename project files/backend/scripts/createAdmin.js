const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const existing = await User.findOne({ email: 'admin@docspot.com' });
  if (existing) {
    console.log("❌ Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = new User({
    name: 'Admin',
    email: 'admin@docspot.com',
    phone: '9999999999',
    password: hashedPassword,
    isDoctor: false,
    type: 'admin',
    notification: []
  });

  await admin.save();
  console.log("✅ Admin created successfully");
  process.exit(0);
};

createAdmin();
