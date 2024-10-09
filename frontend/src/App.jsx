import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NBASchedulePage from './pages/NbaSchedulePage';
import FlightSearchPage from './pages/FlightSearchPage';
import TripSummaryPage from './pages/TripSummaryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/nba-schedules" element={<NBASchedulePage />} />
        <Route path="/flights" element={<FlightSearchPage />} />
        <Route path="/trip-summary" element={<TripSummaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
