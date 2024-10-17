import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CreateTripPage() {
    const location = useLocation();
    const { flight, game } = location.state || {};  // Retrieve the flight and game data from state
    const navigate = useNavigate();

    const handleSaveTrip = () => {
        const token = localStorage.getItem('token');  // Get the token

        if (!token) {
            alert('You need to be logged in to save the trip.');
            return;
        }

        const tripData = {
            flightDetails: flight,
            gameDetails: game,
            flightCost: flight.price,
            gameCost: 100  // Assume a fixed game cost, you can modify this
        };

        // Send trip data to backend API to save the trip
        fetch('http://localhost:5000/api/trips/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include token in request
            },
            body: JSON.stringify(tripData)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to save trip');
            }
            return response.json();
        })
        .then((data) => {
            // Redirect to trip summary page with the newly created trip
            navigate('/trip-summary', { state: { trip: data } });
        })
        .catch((error) => {
            console.error('Error saving trip:', error);
            alert('Failed to save the trip. Please try again.');
        });
    };

    if (!flight || !game) {
        return <p>No flight or game details found. Please go back and select again.</p>;
    }

    return (
        <div>
            <h1>Confirm Your Trip</h1>

            <h2>Selected Game</h2>
            <p>{game.HomeTeam} vs. {game.AwayTeam} at {game.Location} on {new Date(game.DateUtc).toLocaleString()}</p>

            <h2>Selected Flight</h2>
            <p>
                Airline: {flight.airline} <br />
                Flight Number: {flight.flightNumber} <br />
                Departure: {flight.departure.city} at {new Date(flight.departure.at).toLocaleString()} <br />
                Arrival: {flight.arrival.city} at {new Date(flight.arrival.at).toLocaleString()} <br />
                Price: ${flight.price}
            </p>

            <button onClick={handleSaveTrip}>Save Trip</button>
        </div>
    );
}

export default CreateTripPage;
