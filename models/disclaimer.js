require('dotenv').config();
const mongoose = require('mongoose');

const disclaimerSchema = new mongoose.Schema({
    content: { type: String, required: true }, // Основное текстовое содержимое
    updatedAt: { type: Date, default: Date.now } // Дата последнего обновления
});

const Disclaimer = mongoose.model('Disclaimer', disclaimerSchema);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully connected to the database'); //log success message on successful connection
    } catch (err) {
        //log an error message if the connection fails
        console.error('Could not connect to the database:', err);
    }
};

module.exports = Disclaimer;