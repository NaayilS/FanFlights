import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function CreateTripPage() {
    const location = useLocation();  // Access the passed flight and game details
    const { flight, game } = location.state || {};  // Destructure flight and game from state
    const navigate = useNavigate();

    const handleSaveTrip = () => {
        const token = localStorage.getItem('token');  // Get the token

        const tripData = {
            flightDetails: flight,
            gameDetails: game,
            flightCost: flight.price,
            gameCost: 100  // Assuming a fixed game cost for now; you can adjust this later
        };

        // Send the trip data to the backend
        fetch('/api/trips/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(tripData)
        })
        .then((response) => response.json())
        .then((data) => {
            // Navigate to a success or summary page after saving the trip
            navigate('/trip-summary', { state: { trip: data } });
        })
        .catch((error) => {
            console.error('Error saving trip:', error);
        });
    };

    if (!flight || !game) {
        return <p>No flight or game details found. Please try again.</p>;
    }

    return (
        <div className="create-trip-page">
            <h1>Confirm Your Trip</h1>

            <div className="trip-details">
                <h2>Selected Game</h2>
                <p>
                    {game.HomeTeam} vs. {game.AwayTeam} <br />
                    Location: {game.Location} <br />
                    Date: {new Date(game.DateUtc).toLocaleString()}
                </p>

                <h2>Selected Flight</h2>
                <p>
                    Airline: {flight.airline} <br />
                    Flight Number: {flight.flightNumber} <br />
                    From: {flight.departure.city} at {new Date(flight.departure.at).toLocaleString()} <br />
                    To: {flight.arrival.city} at {new Date(flight.arrival.at).toLocaleString()} <br />
                    Price: {flight.price} USD
                </p>

                <button onClick={handleSaveTrip}>Save Trip</button>
            </div>
        </div>
    );
}

export default CreateTripPage;
