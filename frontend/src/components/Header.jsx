import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth';
import logo from '../assets/Fan-Flights.webp'; 

function Header() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('username');
                localStorage.removeItem('token');  // Clear token if needed
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    return (
        <header>
            <div className="header-logo">
                {/* Make the logo clickable and link to the home page */}
                <Link to="/">
                    <img src={logo} alt="Fan Flights Logo" className="logo" />
                </Link>
                <h1>Fan Flights</h1>
            </div>
            <nav>
                <Link to="/">Home</Link>
                {username ? (
                    <div>
                        <span>Welcome, {username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
