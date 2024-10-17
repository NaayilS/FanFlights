import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Import calendar styles

const localizer = momentLocalizer(moment);

function NBAList({ onGameSelect }) {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        fetch('/nbaSchedule.json') 
            .then((response) => response.json())
            .then((data) => setSchedule(data));
    }, []);

    const events = schedule.map((game) => ({
        title: `${game.HomeTeam} vs. ${game.AwayTeam}`,
        start: new Date(game.DateUtc), // Convert UTC to Date object
        end: new Date(game.DateUtc),   // Assume the game lasts around 2-3 hours
        allDay: false,
        gameData: game // Store the entire game data for further use
    }));

    const handleSelectEvent = (event) => {
        onGameSelect(event.gameData);  // Pass the selected game to the parent component
    };

    return (
        <div>
            <h2>Select an NBA Game</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleSelectEvent}  // Trigger selection on clicking an event
            />
        </div>
    );
}

export default NBAList;
