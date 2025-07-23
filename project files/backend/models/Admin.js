const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
