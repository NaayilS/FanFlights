import express from 'express';
import { getFlights } from '../controllers/apiService.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get flight data from Amadeus
router.get('/flights', protect, async (req, res) => {
    const { origin, destination, date, passengers } = req.query;
    
    try {
        // Fetch flights using Amadeus API
        const flights = await getFlights(origin, destination, date, passengers || 1);
        res.status(200).json(flights);
    } catch (error) {
        console.error('Error fetching flight data:', error);
        res.status(500).json({ message: 'Failed to fetch flight data' });
    }
});

export default router;
