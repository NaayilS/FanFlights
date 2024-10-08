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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
