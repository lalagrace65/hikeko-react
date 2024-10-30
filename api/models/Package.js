const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    hours: { type: Number, required: true },
    minutes: { type: Number, required: true },
});

const packageSchema = mongoose.Schema({
    travelAgency: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    trailId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trails' },
    packages: [String],
    price: String,
    paymentOptions: String,
    extraInfo: String,
    checkIn: timeSchema,   // Time stored as { hours, minutes }
    checkOut: timeSchema,  // Time stored as { hours, minutes }
    maxGuests: String,
    date: { type: Date, required: true },        // Date field
    timestamp: { type: Date, required: true },   // Timestamp field
});

const PackageModel = mongoose.model('Package', packageSchema);

module.exports = PackageModel;
