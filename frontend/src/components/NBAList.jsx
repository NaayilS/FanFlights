import React, { useState, useEffect } from 'react';

function NBAList({ onGameSelect }) {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch('/nbaSchedule.json') 
            .then((response) => response.json())
            .then((data) => setSchedule(data));
    }, []);

      // Function to convert UTC to local time
      const convertToLocalTime = (utcDate) => {
        const date = new Date(utcDate);  // Create a date object from the UTC string
        return date.toLocaleString(undefined, { 
            timeZoneName: 'short', // Displays time zone abbreviation (e.g., PST, EST)
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,          // Use 12-hour clock format
            weekday: 'long',       // Display day of the week
            month: 'long',         // Display full month
            day: 'numeric',        // Display day of the month
            year: 'numeric'        // Display full year
        });
    };


    return (
        <div>
            <h2>Select an NBA Game</h2>
            <ul>
                {schedule.map((game, index) => (
                    <li key={index}>
                        <button onClick={() => onGameSelect(game)}>
                            {new Date(game.DateUtc).toLocaleDateString()} - {game.HomeTeam} vs. {game.AwayTeam} at {game.Location}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NBAList;
