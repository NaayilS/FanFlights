import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [favoriteTeam, setFavoriteTeam] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = () => {
        const userData = { username, email, password, favoriteTeam };

        // Send registration data to the server
        fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', data.token);
                // Navigate to the login page or the homepage
                navigate('/login');
            } else {
                setErrorMessage(data.message || 'Registration failed');
            }
        })
        .catch((error) => {
            console.error('Error during registration:', error);
            setErrorMessage('An error occurred. Please try again.');
        });
    };

    return (
        <div className="register-page">
            <h1>Register</h1>
            <div className="form-group">
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </div>
            <div className="form-group">
                <label>Favorite NBA Team:</label>
                <input type="text" value={favoriteTeam} onChange={(e) => setFavoriteTeam(e.target.value)} placeholder="Enter your favorite NBA team" />
            </div>
            <button onClick={handleRegister}>Register</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
}

export default RegisterPage;
