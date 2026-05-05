const express = require('express');
const router = express.Router();
const { getItems, addItem, updateStock } = require('../controllers/inventoryController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', protect, getItems);
router.post('/', protect, authorizeRoles('Admin', 'Manager'), addItem);
router.put('/:id', protect, authorizeRoles('Admin', 'Manager'), updateStock);

module.exports = router;