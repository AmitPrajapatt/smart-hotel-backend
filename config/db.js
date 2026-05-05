const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Mongoose 7+ handles options automatically, no need for useNewUrlParser
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;