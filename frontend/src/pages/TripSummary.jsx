import React from 'react';
import { useLocation } from 'react-router-dom';

function TripSummary() {
    const location = useLocation();
    const { trip } = location.state || {};  // Retrieve the saved trip from state

    if (!trip) {
        return <p>No trip details found. Please try again.</p>;
    }

    return (
        <div>
            <h1>Trip Summary</h1>

            <h2>Game Details</h2>
            <p>{trip.gameDetails.HomeTeam} vs {trip.gameDetails.AwayTeam} at {trip.gameDetails.Location} on {new Date(trip.gameDetails.DateUtc).toLocaleString()}</p>

            <h2>Flight Details</h2>
            <p>
                Airline: {trip.flightDetails.airline} <br />
                Flight Number: {trip.flightDetails.flightNumber} <br />
                Departure: {trip.flightDetails.departure.city} at {new Date(trip.flightDetails.departure.at).toLocaleString()} <br />
                Arrival: {trip.flightDetails.arrival.city} at {new Date(trip.flightDetails.arrival.at).toLocaleString()} <br />
                Price: ${trip.totalCost} (Total Trip Cost)
            </p>
        </div>
    );
}

export default TripSummary;
