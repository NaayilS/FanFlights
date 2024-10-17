import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signOut } from 'firebase/auth';

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
            <h1>Fan Flights</h1>
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
