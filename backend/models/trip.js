import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    flightDetails: {
        type: Object,
        required: true
    },
    gameDetails: {
        type: Object,
        required: true
    },
    gameCost: {
        type: Number,
        required: true
    },
    flightCost: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
// Create the Trip model
const Trip = mongoose.model('Trip', tripSchema);

export default Trip;