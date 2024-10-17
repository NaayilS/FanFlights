import React from 'react';
import { useLocation } from 'react-router-dom';

function TripSummary() {
    const location = useLocation();
    const { trip } = location.state || {};  // Access the saved trip details

    if (!trip) {
        return <p>No trip details found. Please try again.</p>;
    }

    return (
        <div className="trip-summary-page">
            <h1>Trip Summary</h1>
            <p>Game: {trip.gameDetails.HomeTeam} vs {trip.gameDetails.AwayTeam}</p>
            <p>Flight: {trip.flightDetails.airline} - Flight {trip.flightDetails.flightNumber}</p>
            <p>Total Cost: ${trip.totalCost}</p>
        </div>
    );
}

export default TripSummary;
