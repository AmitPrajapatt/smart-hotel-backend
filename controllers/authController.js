const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email, // Fixed: Added email
            role: user.role,
            token: generateToken(user._id)
        });
    } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email, // Fixed: Added email
                role: user.role,
                token: generateToken(user._id)
            });
        } else { res.status(401).json({ message: 'Invalid email or password' }); }
    } catch (error) { res.status(500).json({ error: error.message }); }
};

// NAYA FUNCTION: Update User Profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            
            // Agar naya password dala hai toh update karo
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(req.body.password, salt);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                token: req.headers.authorization.split(' ')[1] // Puraana token same rakho
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) { res.status(500).json({ error: error.message }); }
};