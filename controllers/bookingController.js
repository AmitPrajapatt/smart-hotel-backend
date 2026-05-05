const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.createBooking = async (req, res) => {
    try {
        const { guestName, guestPhone, roomId, checkInDate, checkOutDate } = req.body;

        // 1. Check if room is available
        const room = await Room.findById(roomId);
        if (!room || room.status !== 'Available') {
            return res.status(400).json({ message: 'Room is not available' });
        }

        // 2. Calculate simple total (assuming 1 night for this example)
        const totalAmount = room.pricePerNight; // Expand this with date math for real project

        // 3. Create Booking
        const newBooking = new Booking({
            guestName, guestPhone, room: roomId, checkInDate, checkOutDate, totalAmount
        });
        await newBooking.save();

        // 4. Update Room Status
        room.status = 'Occupied';
        await room.save();

        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room', 'roomNumber type');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};