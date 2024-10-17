import React from 'react';
import { useLocation } from 'react-router-dom';

function TripSummary() {
    const { state } = useLocation(); // Get the trip data from the state

    const { flightDetails, gameDetails } = state.tripData;

    return (
        <div>
            <h1>Trip Summary</h1>
            <h2>Game Details</h2>
            <p>{gameDetails.HomeTeam} vs. {gameDetails.AwayTeam}</p>
            <p>Location: {gameDetails.Location}</p>
            <p>Date: {new Date(gameDetails.DateUtc).toLocaleString()}</p>

            <h2>Flight Details</h2>
            <p>Airline: {flightDetails.airline}</p>
            <p>Price: ${flightDetails.price}</p>
            <p>Duration: {flightDetails.duration}</p>
            <p>Departure: {new Date(flightDetails.departure.at).toLocaleString()}</p>
            <p>Arrival: {new Date(flightDetails.arrival.at).toLocaleString()}</p>

            <button>Confirm and Save Trip</button> {/* Add functionality to save to the backend */}
        </div>
    );
}

export default TripSummary;
