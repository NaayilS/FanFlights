import express from 'express';
import { createTrip, getTrips, updateTrip, deleteTrip } from '../controllers/tripController.js';
import { updateTripStatus } from '../controllers/tripController.js';

const router = express.Router();

// Route to create a new trip
router.post('/create', createTrip);

// Route to get all trips for a user
router.get('/:userId', getTrips);

// Route to update a trip
router.put('/:id', updateTrip);

//Route to update status
router.put('/status/:id', updateTripStatus);

// Route to delete a trip
router.delete('/:id', deleteTrip);

export default router;
