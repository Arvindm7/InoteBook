import React from 'react';

const About = () => {
    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <h2 style={headingStyle}>About iNotebook</h2>
                <p style={paragraphStyle}>
                    iNotebook is a versatile digital notebook application designed to help users organize their thoughts, ideas, and tasks efficiently. With its intuitive interface and powerful features, iNotebook is the perfect tool for students, professionals, and creatives alike.
                </p>
                <h3 style={subHeadingStyle}>Features:</h3>
                <ul style={listStyle}>
                    <li>Easy-to-use interface</li>
                    <li>Multiple notebook organization</li>
                    <li>Rich text editing capabilities</li>
                    <li>Cloud synchronization</li>
                    <li>Customizable themes</li>
                    <li>Search functionality</li>
                </ul>
                <p style={paragraphStyle}>
                    Whether you're jotting down notes in class, brainstorming ideas for a project, or keeping track of your daily tasks, iNotebook provides the flexibility and convenience you need to stay productive.
                </p>
                <p style={paragraphStyle}>
                    Developed by a team of passionate developers, iNotebook is constantly evolving to meet the changing needs of its users. We are committed to providing a seamless and enjoyable note-taking experience for everyone.
                </p>
            </div>
        </div>
    );
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

const contentStyle = {
    maxWidth: '800px',
    padding: '2rem',
    backgroundColor: '#f7f7f7',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
    color: '#004080',
};

const subHeadingStyle = {
    color: '#004080',
    marginTop: '1.5rem',
};

const paragraphStyle = {
    color: '#333333',
    lineHeight: '1.6',
};

const listStyle = {
    color: '#333333',
    marginTop: '0.5rem',
};

export default About;
