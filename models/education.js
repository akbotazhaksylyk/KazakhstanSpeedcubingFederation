require('dotenv').config();
const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Название документа
    url: { type: String, required: true }, // URL для доступа к документу
    createdAt: { type: Date, default: Date.now }, // Дата создания, автоматически устанавливается
});

const Education = mongoose.model('Education', educationSchema);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully connected to the database'); //log success message on successful connection
    } catch (err) {
        //log an error message if the connection fails
        console.error('Could not connect to the database:', err);
    }
};

module.exports = Education;