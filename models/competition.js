require('dotenv').config();
const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nameReason: { type: String, required: false },
    city: { type: String, required: true },
    venueName: { type: String, required: true },
    venueDetails: { type: String, required: false },
    venueAddress: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    information: { type: String, required: false },
    competitorLimit: { type: Number, required: false },
    competitorLimitReason: { type: String, required: false },
    staff: {
        delegates: [String],
        organizers: [String],
        contactInfo: String
    },
    registration: {
        // allowOnTheSpot: { type: Boolean, default: true },
        // allowSelfDeleteAfterAcceptance: { type: Boolean, default: false },
        extraRequirements: { type: String, required: false }
    },
    entryFees: {
        baseEntryFee: { type: String, required: true },
        guestEntryFee: { type: String, required: false }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Competition = mongoose.model('Competition', competitionSchema);

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Successfully connected to the database'); //log success message on successful connection
    } catch (err) {
        //log an error message if the connection fails
        console.error('Could not connect to the database:', err);
    }
};

module.exports = Competition;