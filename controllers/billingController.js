const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.generateInvoice = async (req, res) => {
    try {
        const bookingId = req.params.id;
        // Room data nikalna zaroori hai price ke liye
        const booking = await Booking.findById(bookingId).populate('room');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.paymentStatus === 'Paid') {
            return res.status(400).json({ message: 'Invoice already paid' });
        }

        // Days calculate karna
        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const daysStayed = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

        // Billing Logic
        const roomRate = booking.room.pricePerNight;
        const baseAmount = roomRate * daysStayed;
        const taxAmount = baseAmount * 0.18; // 18% GST
        const finalTotal = baseAmount + taxAmount;

        // Update Booking
        booking.totalAmount = finalTotal;
        booking.paymentStatus = 'Paid';
        await booking.save();

        // Room ko wapas cleaning mein bhejna
        const room = await Room.findById(booking.room._id);
        if(room) {
            room.status = 'Cleaning';
            await room.save();
        }

        res.status(200).json({
            message: 'Checkout successful',
            invoice: {
                guestName: booking.guestName,
                roomNumber: booking.room.roomNumber,
                daysStayed,
                baseAmount,
                taxAmount,
                finalTotal,
                status: 'Paid'
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};