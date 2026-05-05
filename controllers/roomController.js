const Room = require('../models/Room');

// Create a new room (Only Admin/Manager)
exports.createRoom = async (req, res) => {
    try {
        const { roomNumber, type, pricePerNight, status } = req.body;
        
        // Check if room number already exists
        const roomExists = await Room.findOne({ roomNumber });
        if (roomExists) {
            return res.status(400).json({ message: 'Room number already exists' });
        }
        
        const room = await Room.create({ 
            roomNumber, 
            type, 
            pricePerNight, 
            status 
        });
        
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ roomNumber: 1 }); // Sorted numerically/alphabetically
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};