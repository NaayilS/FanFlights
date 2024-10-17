import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signOut, onAuthStateChanged } from 'firebase/auth'; // Added onAuthStateChanged to track auth state
import logo from '../assets/Fan-Flights.webp'; 

function Header() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    // This will check the Firebase auth state when the app loads and persist login state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const displayName = user.displayName || user.email; // You can use displayName or email
                setUsername(displayName); // Update the state with the username or email
                localStorage.setItem('username', displayName); // Store the username in localStorage
            } else {
                setUsername(''); // Clear username when logged out
                localStorage.removeItem('username'); // Remove from localStorage
            }
        });

        // Clean up subscription when component unmounts
        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('username');
                localStorage.removeItem('token');  // Clear token if needed
                setUsername(''); // Clear the state
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
