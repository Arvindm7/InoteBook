import React, { useEffect } from 'react';

const Alert = ({ message, type, onClose }) => {
    // Automatically close the alert after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Call the onClose function to remove the alert
        }, 5000); // 5000 milliseconds (5 seconds)
        
        return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }, [onClose]);

    return (
        <div style={alertStyle(type)}>
            {message}
        </div>
    );
};

const alertStyle = (type) => {
    let backgroundColor = '';
    switch (type) {
        case 'success':
            backgroundColor = '#d4edda'; // Greenish
            break;
        case 'error':
            backgroundColor = '#f8d7da'; // Reddish
            break;
        case 'warning':
            backgroundColor = '#fff3cd'; // Yellowish
            break;
        default:
            backgroundColor = '#e2e3e5'; // Default grey
    }

    return {
        padding: '1rem',
        margin: '1rem 0',
        borderRadius: '5px',
        backgroundColor,
        color: '#333', // Dark text color
        border: '1px solid #ccc',
    };
};

export default Alert;
