const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cors = require('cors');
app.use(cors()); // Isko app.use(express.json()) ke theek neeche likhein
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected to Smart Hotel DB'))
  .catch(err => console.log(err));

// Routes (We will define booking routes below)
app.use('/api/bookings', require('./routes/bookingRoutes'));
// ... existing code ...

// Import Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/billing', require('./routes/billingRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/housekeeping', require('./routes/housekeepingRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
// ... existing code ...
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));