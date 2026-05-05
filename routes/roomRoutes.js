const express = require('express');
const router = express.Router();
const { createRoom, getAllRooms } = require('../controllers/roomController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Get all rooms (Any logged in user like Receptionist can view)
router.get('/', protect, getAllRooms);

// Create room (Only Admin and Manager)
router.post('/', protect, authorizeRoles('Admin', 'Manager'), createRoom);

module.exports = router;