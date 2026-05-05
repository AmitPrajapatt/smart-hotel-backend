const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    category: { type: String, enum: ['Toiletries', 'Linen', 'Food & Beverage', 'Cleaning Supplies'], required: true },
    quantity: { type: Number, required: true, default: 0 },
    minThreshold: { type: Number, required: true, default: 10 } // Isse kam hone par alert aayega
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);