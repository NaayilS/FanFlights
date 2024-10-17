import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const loginData = { username, password };

        // Send login data to the server
        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', data.token);
                // Navigate to the homepage or NBA schedule page
                navigate('/');
            } else {
                setErrorMessage(data.message || 'Login failed');
            }
        })
        .catch((error) => {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred. Please try again.');
        });
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <div className="form-group">
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </div>
            <button onClick={handleLogin}>Login</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <p>Don't have an account? <a href="/register">Create one here</a></p>
        </div>
    );
}

export default LoginPage;
