import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const airportCodes = [
    { city: "Boston", code: "BOS" },
    { city: "Brooklyn", code: "JFK" },
    { city: "Brooklyn", code: "LGA" },
    { city: "New York", code: "JFK" },
    { city: "New York", code: "LGA" },
    { city: "Philadelphia", code: "PHL" },
    { city: "Toronto", code: "YYZ" },
    { city: "Chicago", code: "ORD" },
    { city: "Chicago", code: "MDW" },
    { city: "Cleveland", code: "CLE" },
    { city: "Detroit", code: "DTW" },
    { city: "Indianapolis", code: "IND" },
    { city: "Milwaukee", code: "MKE" },
    { city: "Atlanta", code: "ATL" },
    { city: "Charlotte", code: "CLT" },
    { city: "Miami", code: "MIA" },
    { city: "Orlando", code: "MCO" },
    { city: "Washington", code: "DCA" },
    { city: "Denver", code: "DEN" },
    { city: "Phoenix", code: "PHX" },
    { city: "Portland", code: "PDX" },
    { city: "Salt Lake City", code: "SLC" },
    { city: "San Francisco", code: "SFO" },
    { city: "Los Angeles", code: "LAX" },
    { city: "Sacramento", code: "SMF" },
    { city: "Dallas", code: "DFW" },
    { city: "Dallas", code: "DAL" },
    { city: "Houston", code: "IAH" },
    { city: "Houston", code: "HOU" },
    { city: "Memphis", code: "MEM" },
    { city: "New Orleans", code: "MSY" },
    { city: "San Antonio", code: "SAT" },
    { city: "Minneapolis", code: "MSP" },
    { city: "Oklahoma City", code: "OKC" },
    { city: "Las Vegas", code: "LAS" },
    { city: "Mexico City", code: "MEX" }
];

function FlightSearchPage() {
    const [departureCity, setDepartureCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    
    const location = useLocation();
    const selectedGame = location.state?.selectedGame || {};

    const navigate = useNavigate();

    const handleSearchFlights = () => {
        setLoading(true);
        // Fetch flights based on inputs
        fetch(`http://localhost:5000/api/flights?origin=${departureCity}&destination=${destinationCity}&date=${travelDate}`)
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

    const handleBookFlight = (flight) => {
        // Redirect to create trip page, passing selected flight and game details
        navigate('/create-trip', {
            state: {
                flight,
                game: selectedGame
            }
        });
    };

    // Suggestions for city input
    const handleCityInput = (input, setCityFunction, setSuggestionsFunction) => {
        setCityFunction(input);
        if (input.length > 0) {
            const filteredSuggestions = airportCodes.filter((airport) =>
                airport.city.toLowerCase().startsWith(input.toLowerCase())
            );
            setSuggestionsFunction(filteredSuggestions);
        } else {
            setSuggestionsFunction([]);
        }
    };

    // Select suggestion
    const handleSuggestionSelect = (city, code, setCityFunction, setSuggestionsFunction) => {
        setCityFunction(code);
        setSuggestionsFunction([]);
    };

    return (
        <div className="flight-search-page">
            <h1>Choose Your Flight!</h1>
            <p>
                Selected Game: {selectedGame.HomeTeam} vs. {selectedGame.AwayTeam} <br />
                Location: {selectedGame.Location} <br />
                Date: {new Date(selectedGame.DateUtc).toLocaleDateString()}
            </p>

            <div className="search-form">
                <label>
                    Departure City (IATA code):
                    <input
                        type="text"
                        value={departureCity}
                        onChange={(e) => handleCityInput(e.target.value, setDepartureCity, setDepartureSuggestions)}
                        placeholder="Enter departure city"
                    />
                    {departureSuggestions.length > 0 && (
                        <ul className="autocomplete-suggestions">
                            {departureSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() =>
                                    handleSuggestionSelect(suggestion.city, suggestion.code, setDepartureCity, setDepartureSuggestions)
                                }>
                                    {suggestion.city} ({suggestion.code})
                                </li>
                            ))}
                        </ul>
                    )}
                </label>

                <label>
                    Destination City (IATA code):
                    <input
                        type="text"
                        value={destinationCity}
                        onChange={(e) => handleCityInput(e.target.value, setDestinationCity, setDestinationSuggestions)}
                        placeholder="Enter destination city"
                    />
                    {destinationSuggestions.length > 0 && (
                        <ul className="autocomplete-suggestions">
                            {destinationSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() =>
                                    handleSuggestionSelect(suggestion.city, suggestion.code, setDestinationCity, setDestinationSuggestions)
                                }>
                                    {suggestion.city} ({suggestion.code})
                                </li>
                            ))}
                        </ul>
                    )}
                </label>

                <label>
                    Travel Date:
                    <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                    />
                </label>

                <button onClick={handleSearchFlights} disabled={loading}>
                    {loading ? 'Searching...' : 'Search Flights'}
                </button>
            </div>

            <div className="flight-results">
                {flights.length > 0 ? (
                    flights.map((flight, index) => (
                        <div key={index} className="flight-card">
                            <p>
                                <strong>{flight.airline} - Flight {flight.flightNumber}</strong> <br />
                                From: {flight.departure.city} at {new Date(flight.departure.at).toLocaleString()} <br />
                                To: {flight.arrival.city} at {new Date(flight.arrival.at).toLocaleString()} <br />
                                Price: {flight.price} USD <br />
                            </p>
                            <button onClick={() => handleBookFlight(flight)}>Book Flight</button>
                        </div>
                    ))
                ) : (
                    <p>No flights found for this search.</p>
                )}
            </div>
        </div>
    );
}

export default FlightSearchPage;
