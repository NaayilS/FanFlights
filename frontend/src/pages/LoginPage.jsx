import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';  // Import Firebase auth instance
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Store username in localStorage
                localStorage.setItem('username', user.displayName);
                // Navigate to home or NBA schedule
                navigate('/');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
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
