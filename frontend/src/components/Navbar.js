import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { getNotesCount } = useContext(noteContext);
    const [notesCount, setNotesCount] = useState(0);
    const isLoggedIn = localStorage.getItem('token') !== null;

    useEffect(() => {
        const fetchNotesCount = async () => {
            if (isLoggedIn) {
                const count = await getNotesCount();
                setNotesCount(count);
            }
        };
        fetchNotesCount();
    }, [isLoggedIn, getNotesCount]);


    const handleMouseEnter = (e) => {
        e.target.style.color = linkHoverStyle.color;
        e.target.style.transform = 'scale(1.1)';
    };

    const handleMouseLeave = (e) => {
        e.target.style.color = linkStyle.color;
        e.target.style.transform = 'scale(1)';
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

;

    return (
        <nav style={navbarStyle}>
            <h1 style={titleStyle}>iNotebook</h1>
            <ul style={linksStyle}>
                <li>
                    <a
                        href="/"
                        style={linkStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="/about"
                        style={linkStyle}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        About
                    </a>
                </li>
                <li style={{ color: '#ffffff', fontSize: '1rem' }}>
                    Your Notes: {notesCount}
                </li>
                {isLoggedIn ? (
                    <li>
                        <button
                            onClick={handleLogout}
                            style={{ ...buttonStyle, backgroundColor: 'red' }}
                        >
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <a
                                href="/login"
                                style={buttonStyle}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                Login
                            </a>
                        </li>
                        <li>
                            <a
                                href="/signup"
                                style={buttonStyle}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                Signup
                            </a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#004080', // Dark blue background color
    padding: '1rem 2rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1, // Ensure the navbar is above other elements
};

const titleStyle = {
    color: '#ffffff', // White color for the title
    fontSize: '1.75rem',
    fontWeight: 'bold',
    margin: 0,
};

const linksStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
};

const linkStyle = {
    color: '#ffffff', // White color for the links
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s, transform 0.3s',
};

const linkHoverStyle = {
    color: '#66ccff', // Light blue color on hover
};

const buttonStyle = {
    color: '#ffffff', // White color for the buttons
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    backgroundColor: '#007bff', // Primary blue background color
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
};

export default Navbar;
