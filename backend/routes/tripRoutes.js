import express from 'express';
import { createTrip, getTrips, updateTrip, deleteTrip } from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new trip
router.post('/create', protect, createTrip);

// Route to get all trips for a user
router.get('/:userId', protect, getTrips);

// Route to update a trip
router.put('/:id', protect, updateTrip);

//Route to update status
router.put('/status/:id', protect, updateTripStatus);

// Route to delete a trip
router.delete('/:id', protect, deleteTrip);

export default router;
