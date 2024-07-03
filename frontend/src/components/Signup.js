import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const host = "https://cloudnotebook-3gsi.onrender.com";
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (credentials.password !== credentials.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            }),
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            setShowAlert(true); // Show alert for successful sign-up
            setTimeout(() => {
                setShowAlert(false); // Hide alert after 3 seconds
                navigate("/");
            }, 3000); // Redirect after 3 seconds
        } else {
            setError(json.error || 'Failed to sign up');
        }
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h2 style={headingStyle}>Sign Up</h2>
                {error && <div style={errorStyle}>{error}</div>}
                {showAlert && (
                    <div style={alertStyle}>
                        <p style={alertTextStyle}>Sign up successful!</p>
                    </div>
                )}
                <form style={formStyle} onSubmit={handleSubmit}>
                    <div style={formGroupStyle}>
                        <label htmlFor="name" style={labelStyle}>Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={credentials.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            style={inputStyle}
                            required
                            minLength={5}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor="email" style={labelStyle}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            style={inputStyle}
                            required
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url("https://source.unsplash.com/random/1600x900")', // Random background image from Unsplash
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    paddingTop: '4rem', // Adjust this value to create space between the navbar and the form
};

const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white background
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '100%',
};

const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
};

const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
};

const labelStyle = {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#004080',
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderColor: '#004080',
    borderRadius: '5px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s',
};

const buttonStyle = {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#004080',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.3s',
};

const errorStyle = {
    color: 'red',
    marginBottom: '1rem',
};

const alertStyle = {
    position: 'fixed',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: '1000', // Ensure above other content
};

const alertTextStyle = {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
};

export default SignUpForm;
