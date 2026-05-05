const express = require('express');
const router = express.Router();
const { getTasks, updateTaskStatus } = require('../controllers/housekeepingController');
const { protect } = require('../middleware/authMiddleware');

// Route to get tasks and update them
router.get('/', protect, getTasks);
router.put('/:id', protect, updateTaskStatus);

module.exports = router;