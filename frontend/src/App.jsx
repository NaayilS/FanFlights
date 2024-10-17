import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import FlightSearchPage from './pages/FlightSearchPage';
import CreateTripPage from './pages/CreateTripPage';
import TripSummary from './pages/TripSummary';
import TripListPage from './pages/TripListPage';
import UpdateTripPage from './pages/UpdateTripPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/flight-search" element={<FlightSearchPage />} />
                <Route path="/create-trip" element={<CreateTripPage />} />
                <Route path="/trip-summary" element={<TripSummary />} />
                <Route path="/trips" element={<TripListPage />} />
                <Route path="/update-trip/:id" element={<UpdateTripPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
