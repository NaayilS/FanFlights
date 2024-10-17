import React, { useState } from 'react';
import NBAList from '../components/NBAList';
import FlightSearch from '../components/FlightSearch';

function Home() {
    const [selectedGame, setSelectedGame] = useState(null);

    return (
        <div>
            <h1>Fan Flights</h1>
            <NBAList onGameSelect={setSelectedGame} />

            {selectedGame && (
                <FlightSearch selectedGame={selectedGame} />
            )}
        </div>
    );
}

export default Home;
