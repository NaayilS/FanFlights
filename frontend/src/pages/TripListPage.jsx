import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TripListPage() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch all trips for the current user
        fetch(`http://localhost:5000/api/trips/${localStorage.getItem('userId')}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setTrips(data))
        .catch((error) => console.error('Error fetching trips:', error));
    }, []);

    const handleUpdateTrip = (trip) => {
        navigate(`/update-trip/${trip._id}`, { state: { trip } });
    };

    const handleDeleteTrip = (tripId) => {
        const token = localStorage.getItem('token');

        fetch(`/api/trips/${tripId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then(() => {
            // Remove the deleted trip from the list
            setTrips(trips.filter(trip => trip._id !== tripId));
        })
        .catch((error) => console.error('Error deleting trip:', error));
    };

    return (
        <div>
            <h1>Your Trips</h1>
            {trips.length > 0 ? (
                trips.map((trip) => (
                    <div key={trip._id}>
                        <h2>{trip.gameDetails.HomeTeam} vs {trip.gameDetails.AwayTeam}</h2>
                        <p>Flight: {trip.flightDetails.airline}, Cost: ${trip.totalCost}</p>
                        <button onClick={() => handleUpdateTrip(trip)}>Update Trip</button>
                        <button onClick={() => handleDeleteTrip(trip._id)}>Delete Trip</button>
                    </div>
                ))
            ) : (
                <p>No trips found.</p>
            )}
        </div>
    );
}

export default TripListPage;
