import React, { useState } from 'react';

function FlightSearch({ selectedGame, onTripSave }) {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearchFlights = () => {
        setLoading(true);
        const origin = 'LAX';  // You can dynamically set this based on user's input
        fetch(`/api/flights?origin=${origin}&destination=${selectedGame.Location}&date=${selectedGame.DateUtc}`)
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
