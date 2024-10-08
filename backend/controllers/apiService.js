import axios from 'axios';
import dotenv from 'dotenv';
import Amadeus from 'amadeus';

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

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET
});

// Fetch flight data from Amadeus
export const getFlights = async (origin, destination, date) => {
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: date,
            adults: '1'
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching flights:', error.response ? error.response.data : error.message);
        throw error;
    }
};