const Room = require('../models/Room');

// Get all rooms that need attention
exports.getTasks = async (req, res) => {
    try {
        // Sirf Cleaning aur Maintenance wale rooms layenge
        const tasks = await Room.find({ status: { $in: ['Cleaning', 'Maintenance'] } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Room Status (e.g., from Cleaning to Available)
exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const room = await Room.findByIdAndUpdate(req.params.id, { status }, { new: true });
        
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room status updated successfully', room });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};