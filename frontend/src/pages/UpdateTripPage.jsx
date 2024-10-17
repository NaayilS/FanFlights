import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function UpdateTripPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { trip } = location.state;  // Get the trip details from state

    const [flightDetails, setFlightDetails] = useState(trip.flightDetails);
    const [gameDetails, setGameDetails] = useState(trip.gameDetails);
    const [flightCost, setFlightCost] = useState(trip.flightCost);
    const [gameCost, setGameCost] = useState(trip.gameCost);

    const handleUpdateTrip = () => {
        const token = localStorage.getItem('token');
        const updatedTrip = { flightDetails, gameDetails, flightCost, gameCost };

        fetch(`http://localhost:5000/api/trips/${trip._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedTrip)
        })
        .then((response) => response.json())
        .then((data) => {
            // Navigate back to trip list page or show success
            navigate('/trip-summary', { state: { trip: data } });
        })
        .catch((error) => console.error('Error updating trip:', error));
    };

    return (
        <div>
            <h1>Update Trip</h1>

            <div>
                <label>Flight Cost:</label>
                <input type="number" value={flightCost} onChange={(e) => setFlightCost(e.target.value)} />
            </div>

            <div>
                <label>Game Cost:</label>
                <input type="number" value={gameCost} onChange={(e) => setGameCost(e.target.value)} />
            </div>

            <button onClick={handleUpdateTrip}>Update Trip</button>
        </div>
    );
}

export default UpdateTripPage;
