import Trip from '../models/trip.js';

// Create a new trip
export const createTrip = async (req, res) => {
    const { userId, flightDetails, gameDetails } = req.body;

    try {
        const newTrip = new Trip({ userId, flightDetails, gameDetails });
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).json({ message: 'Failed to create trip' });
    }
};