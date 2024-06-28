import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Notes from './Notes';
import AddNote from './AddNote';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
        <>
            <Navbar />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={mainContentStyle}>
                {activeTab === 'home' && (
                    <div style={centeredContent}>
                        <h1 style={headerStyle}>Welcome to iNotebook</h1>
                        <p style={descriptionStyle}>
                            Capture Your Ideas Effortlessly!
                            <br />
                            Your Personal Notebook in the Cloud.
                        </p>
                    </div>
                )}
                {activeTab === 'add-note' && <AddNote />}
                {activeTab === 'your-notes' && <Notes />}
            </div>
        </>
    );
};

const mainContentStyle = {
    marginLeft: '250px', // Space for the sidebar
    padding: '2rem',
    marginTop: '64px', // Space for the navbar
    backgroundColor: '#f0f0f0', // Light grey background for main content
    minHeight: 'calc(100vh - 64px)',
    color: '#333', // Dark text color
};

const centeredContent = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
};

const headerStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
};

const descriptionStyle = {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
};

export default HomePage;
