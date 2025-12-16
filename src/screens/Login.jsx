// src/screens/Login.jsx
import React, { useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import Screen from '../components/Screen';

const Login = ({ activeScreen, goToScreen, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "test@gmail.com" && password === "admin123") {
            onLoginSuccess();
        } else {
            alert("Invalid login credentials");
        }
    };

    return (
        <Screen screenId={7} activeScreen={activeScreen}>
            <div className="logo">🏥</div>
            <h1 style={{ textAlign: 'center' }}>Welcome Back</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Login to continue</p>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    className="input-field"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <PrimaryButton type="submit">Login</PrimaryButton>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                Don't have an account?
                <span onClick={() => goToScreen(8)} style={{ color: '#2463eb', cursor: 'pointer', fontWeight: 600 }}>Sign Up</span>
            </p>
        </Screen>
    );
};

export default Login;