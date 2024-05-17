require('dotenv').config();
const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    avatarUrl: {
        type: String,
        default: "/uploads/default.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
});

const registration = mongoose.model('registration', registrationSchema);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully connected to the database'); //log success message on successful connection
    } catch (err) {
        //log an error message if the connection fails
        console.error('Could not connect to the database:', err);
    }
};

module.exports = {
    registration,
    connectToDatabase
};