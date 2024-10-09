import express from 'express';
import { getNBASchedules, getGameTickets, getFlights } from '../controllers/apiService.js';


const router = express.Router();

// Route to get NBA schedules
router.get('/nba-schedules', async (req, res) => {
    const team = req.query.team || req.user.favoriteTeam;  // Use favorite team if none provided

    try {
        const schedules = await getNBASchedules(team);  
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching NBA schedules:', error);
        res.status(500).json({ message: 'Failed to fetch NBA schedules' });
    }
});

// Route to get game tickets
router.get('/game-tickets/:team', async (req, res) => {
    const teamName = req.params.team;
    try {
        const tickets = await getGameTickets(teamName);
        res.status(200).json(tickets);
    } catch (error) {
        console.error(`Error fetching tickets for ${teamName}:`, error);
        res.status(500).json({ message: 'Failed to fetch game tickets' });
    }
});

// Route to get flight data
router.get('/flights', async (req, res) => {
    const { origin, destination, date } = req.query;
    try {
        const flights = await getFlights(origin, destination, date);
        res.status(200).json(flights);
    } catch (error) {
        console.error('Error fetching flight data:', error);
        res.status(500).json({ message: 'Failed to fetch flight data' });
    }
});

export default router;
