const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
