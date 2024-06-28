import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div style={sidebarStyle}>
            <div
                style={{ ...tabStyle, backgroundColor: activeTab === 'add-note' ? '#66ccff' : '#004080' }}
                onClick={() => handleTabClick('add-note')}
            >
                Add Notes
            </div>
            <div
                style={{ ...tabStyle, backgroundColor: activeTab === 'your-notes' ? '#66ccff' : '#004080' }}
                onClick={() => handleTabClick('your-notes')}
            >
                Your Notes
            </div>
        </div>
    );
};

const sidebarStyle = {
    height: '100%',
    width: '250px',
    position: 'fixed',
    top: '64px', // Below the navbar
    left: 0,
    backgroundColor: '#004080', // Dark blue background color
    padding: '1rem',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    color: '#ffffff', // White text color
};

const tabStyle = {
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    backgroundColor: '#004080',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    color: '#ffffff',
    textDecoration: 'none',
};

export default Sidebar;
