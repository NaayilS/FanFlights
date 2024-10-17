import React, { useState } from 'react';

function FlightSearch({ selectedGame, onTripSave }) {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearchFlights = () => {
        setLoading(true);
    
        const token = localStorage.getItem('token');  // Retrieve the token from localStorage
    
        // Fetch flights with the token included in the Authorization header
        fetch(`http://localhost:5000/api/flights?origin=${departureCity}&destination=${destinationCity}&date=${travelDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setFlights(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching flights:', error);
            setLoading(false);
        });
    };

    const handleSelectFlight = (flight) => {
        onTripSave(flight);  // Pass selected flight to save trip
    };

    return (
        <div>
            <h2>Search Flights to {selectedGame.Location}</h2>
            <button onClick={handleSearchFlights} disabled={loading}>
                {loading ? 'Searching...' : 'Search Flights'}
            </button>

            {flights.length > 0 && (
                <ul>
                    {flights.map((flight, index) => (
                        <li key={index}>
                            <p>
                                <strong>Airline:</strong> {flight.airline} <br />
                                <strong>Price:</strong> ${flight.price} <br />
                                <strong>Duration:</strong> {flight.duration} <br />
                                <button onClick={() => handleSelectFlight(flight)}>
                                    Select Flight
                                </button>
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {flights.length === 0 && !loading && <p>No flights found for this game.</p>}
        </div>
    );
}

export default FlightSearch;
