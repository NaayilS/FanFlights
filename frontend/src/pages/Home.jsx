import React, { useState } from 'react';
import NBAList from '../components/NBAList';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleGameSelect = (selectedGame) => {
        // Redirect to the flight search page with selected game data
        navigate('/flight-search', { state: { selectedGame } });
    };

    return (
        <div>
            <h1>NBA Schedule</h1>
            <NBAList onGameSelect={handleGameSelect} />
        </div>
    );
}

export default Home;
