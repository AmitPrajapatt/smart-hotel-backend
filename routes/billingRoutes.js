const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/billingController');
const { protect } = require('../middleware/authMiddleware');

// Route is now protected (needs login), but open to all staff roles
router.post('/checkout/:id', protect, generateInvoice);

module.exports = router;