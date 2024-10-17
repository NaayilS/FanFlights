import Amadeus from 'amadeus';
import dotenv from 'dotenv';

dotenv.config();

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET
});

// Fetch flight data from Amadeus
export const getFlights = async (origin, destination, date, passengers = 1) => {
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: date,
            adults: passengers,
            max: 5  // Adjust this as needed for the number of flights to retrieve
        });

        // Map through the response to format necessary flight information
        const flights = response.data.map(flight => ({
            price: flight.price.total,  // Total price of the flight
            airline: flight.validatingAirlineCodes[0],  // Airline
            segments: flight.itineraries[0].segments,  // List of flight segments
            departure: flight.itineraries[0].segments[0].departure,  // Departure info
            arrival: flight.itineraries[0].segments.slice(-1)[0].arrival,  // Arrival info
            passengers: passengers,  // Number of passengers
            duration: flight.itineraries[0].duration  // Flight duration
        }));

        return flights;

    } catch (error) {
        console.error('Error fetching flights:', error.response ? error.response.data : error.message);
        throw error;
    }
};
