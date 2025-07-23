const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically (if you support file uploads)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));          // Login & Register
app.use('/api/doctor', require('./routes/doctorRoutes'));      // Doctor Register & Info
app.use('/api/appointment', require('./routes/appointmentRoutes')); // Bookings & lists

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to DocSpot API');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
