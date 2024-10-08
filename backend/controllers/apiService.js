import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Fetch NBA schedules from The Sports DB
export const getNBASchedules = async () => {
    try {
        const response = await axios.get(`https://www.thesportsdb.com/api/v1/json/${process.env.SPORTS_DB_API_KEY}/eventsnextleague.php?id=4387`);
        return response.data.events;
    } catch (error) {
        console.error('Error fetching NBA schedules:', error);
        throw error;
    }
};

// Fetch available game tickets from Ticketmaster
export const getGameTickets = async (teamName) => {
    try {
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${teamName}&apikey=${process.env.TICKETMASTER_API_KEY}`);
        return response.data._embedded.events;
    } catch (error) {
        console.error('Error fetching game tickets:', error);
        throw error;
    }
};

// Fetch flight data from Aviationstack
export const getFlights = async (origin, destination, date) => {
    try {
        const response = await axios.get(`http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATIONSTACK_API_KEY}&dep_iata=${origin}&arr_iata=${destination}&flight_date=${date}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching flights:', error);
        throw error;
    }
};
