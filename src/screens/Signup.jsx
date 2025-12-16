// src/screens/Signup.jsx
import React, { useState } from 'react';
import { PrimaryButton } from '../components/Button';
import Screen from '../components/Screen';
import { initialUserData } from '../services/healthLogic';

const Signup = ({ activeScreen, goToScreen, onSignup }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        waist: '',
        hip: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: id === 'age' || id === 'weight' || id === 'height' || id === 'waist' || id === 'hip' ? parseFloat(value) || '' : value
        }));
    };

    const handleSignup = () => {
        // Simple validation check
        if (!formData.name || !formData.age || !formData.gender || !formData.weight || !formData.height) {
            alert("Please fill in all required fields.");
            return;
        }

        const newUserData = {
            ...initialUserData,
            name: formData.name || 'User',
            age: formData.age || 25,
            gender: formData.gender || 'female',
            weight: formData.weight || 60,
            height: formData.height || 165,
            waist: formData.waist || 70,
            hip: formData.hip || 95,
        };

        onSignup(newUserData);
        goToScreen(1); // Go to Home screen
    };

    return (
        <Screen screenId={8} activeScreen={activeScreen}>
            <div className="logo" style={{ fontSize: '60px', margin: '20px 0' }}>🏥</div>
            <h1 style={{ textAlign: 'center' }}>Create Account</h1>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Join us today</p>
            <input type="text" id="name" className="input-field" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input type="email" id="email" className="input-field" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" id="password" className="input-field" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="number" id="age" className="input-field" placeholder="Age" value={formData.age} onChange={handleChange} />
            <div className="form-row">
                <select id="gender" className="input-field" value={formData.gender} onChange={handleChange}>
                    <option value="">Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
                <input type="number" id="weight" className="input-field" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} />
            </div>
            <div className="form-row">
                <input type="number" id="height" className="input-field" placeholder="Height (cm)" value={formData.height} onChange={handleChange} />
                <input type="number" id="waist" className="input-field" placeholder="Waist (cm)" value={formData.waist} onChange={handleChange} />
            </div>
            <input type="number" id="hip" className="input-field" placeholder="Hip (cm)" value={formData.hip} onChange={handleChange} />
            <PrimaryButton onClick={handleSignup}>Create Account</PrimaryButton>
            <p style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
                Already have an account?
                <span onClick={() => goToScreen(7)} style={{ color: '#2463eb', cursor: 'pointer', fontWeight: 600 }}>Login</span>
            </p>
        </Screen>
    );
};

export default Signup;