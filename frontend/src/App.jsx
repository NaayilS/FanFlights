import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FlightSearchPage from './pages/FlightSearchPage';
import TripSummary from './pages/TripSummary';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flight-search" element={<FlightSearchPage />} />
                <Route path="/trip-summary" element={<TripSummary />} />
            </Routes>
        </Router>
    );
}

export default App;
