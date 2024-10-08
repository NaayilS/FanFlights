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

// Get all trips for a user
export const getTrips = async (req, res) => {
    const { userId } = req.params;

    try {
        const trips = await Trip.find({ userId });
        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching trips:', error);
        res.status(500).json({ message: 'Failed to fetch trips' });
    }
};

// Update a trip
export const updateTrip = async (req, res) => {
    const { id } = req.params;
    const { flightDetails, gameDetails } = req.body;

    try {
        const updatedTrip = await Trip.findByIdAndUpdate(id, { flightDetails, gameDetails }, { new: true });
        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error('Error updating trip:', error);
        res.status(500).json({ message: 'Failed to update trip' });
    }
};

// Delete a trip
export const deleteTrip = async (req, res) => {
    const { id } = req.params;

    try {
        await Trip.findByIdAndDelete(id);
        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.error('Error deleting trip:', error);
        res.status(500).json({ message: 'Failed to delete trip' });
    }
};
