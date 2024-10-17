import React, { useState } from 'react';

function FlightSearch({ selectedGame }) {
    const [flights, setFlights] = useState([]);

    const handleSearchFlights = () => {
        fetch(`/api/flights?origin=XYZ&destination=${selectedGame.Location}&date=${selectedGame.DateUtc}`)
            .then((response) => response.json())
            .then((data) => setFlights(data));
    };

    return (
        <div>
            <h2>Search Flights to {selectedGame.Location}</h2>
            <button onClick={handleSearchFlights}>Search Flights</button>

            {flights.length > 0 && (
                <ul>
                    {flights.map((flight, index) => (
                        <li key={index}>
                            Flight from {flight.origin} to {flight.destination} on {flight.date} - ${flight.price}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FlightSearch;
