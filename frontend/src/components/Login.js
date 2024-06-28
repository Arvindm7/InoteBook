import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const host = "http://localhost:5000";
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in with:', credentials);
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect to home
            //const token = (localStorage.getItem('token'));
            //console.log("before" , token)
            localStorage.setItem('token', json.authToken);
            //console.log('Auth token saved which is - ', token);
            setShowAlert(true); // Show alert for successful login
            setTimeout(() => {
                navigate("/"); // Redirect to home page
            }, 2000); // Redirect after 2 seconds
        } else {
            alert('Invalid login');
        }
    };

    return (
        <div style={containerStyle}>
            {showAlert && (
                <div style={alertStyle}>
                    <p style={alertTextStyle}>Login successful!</p>
                </div>
            )}
            <div style={formContainerStyle}>
                <h2 style={headingStyle}>Login</h2>
                <form style={formStyle} onSubmit={handleSubmit}>
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
                    <button type="submit" style={buttonStyle}>Login</button>
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
    height: '100vh',
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

const formContainerStyle = {
    backgroundColor: '#ffffff',
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
    textAlign: 'center',
    marginBottom: '1.5rem',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
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

buttonStyle[':hover'] = {
    backgroundColor: '#003366',
    transform: 'scale(1.05)',
};

export default LoginForm;
