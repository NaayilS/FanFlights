import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightSearch from '../components/FlightSearch';

function FlightSearchPage() {
    const { state } = useLocation(); // Get the selected game from the state
    const navigate = useNavigate();

    const handleTripSave = (flightDetails) => {
        // Save the trip (you can make an API call to save the trip)
        const tripData = {
            flightDetails,
            gameDetails: state.selectedGame
        };
        // After saving, redirect to the Trip Summary page
        navigate('/trip-summary', { state: { tripData } });
    };

    return (
        <div>
            <h1>Flight Search</h1>
            <FlightSearch selectedGame={state.selectedGame} onTripSave={handleTripSave} />
        </div>
    );
}

export default FlightSearchPage;
