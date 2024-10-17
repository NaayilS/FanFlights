import express from 'express';
import { createTrip, getTrips, updateTrip, deleteTrip } from '../controllers/tripController.js';

const router = express.Router();

// Create a new trip
router.post('/create', createTrip);

// Get all trips for a user
router.get('/:userId', getTrips);

// Update a specific trip
router.put('/:id', updateTrip);

// Delete a specific trip
router.delete('/:id', deleteTrip);

export default router;
