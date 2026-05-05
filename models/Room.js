const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Single', 'Double', 'Suite', 'Smart'], required: true },
    pricePerNight: { type: Number, required: true },
    status: { 
        type: String, 
        enum: ['Available', 'Occupied', 'Maintenance', 'Cleaning'], 
        default: 'Available' 
    },
    smartFeatures: {
        lightsOn: { type: Boolean, default: false },
        acTemperature: { type: Number, default: 24 }
    }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);