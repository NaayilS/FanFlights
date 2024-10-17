import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';  // Import the Firebase auth instance
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [favoriteTeam, setFavoriteTeam] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Update the user's profile with the username
                updateProfile(user, {
                    displayName: username
                }).then(() => {
                    // Store the username and favorite team in localStorage (or handle it elsewhere)
                    localStorage.setItem('username', username);
                    localStorage.setItem('favoriteTeam', favoriteTeam);
                    // Navigate to home or login
                    navigate('/');
                });
            })
            .catch((error) => {
                setErrorMessage(error.message);
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
