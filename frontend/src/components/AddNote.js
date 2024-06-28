import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: '', description: '', tag: 'default' });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

   

    const handleSaveNote = (e) => {
        e.preventDefault();

        if (note.title.trim() === '' || note.description.trim() === '') {
            setAlert('Please enter valid entries for title and description.');
            setTimeout(() => {
                setAlert(null);
            }, 3000);
            return;
        }

        addNote(note.title, note.description, note.tag);
        setNote({ title: '', description: '', tag: 'default' });
        setAlert('Note saved successfully!');
        
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div style={containerStyle}>
            {alert && <div style={alertStyle}>{alert}</div>}
            <h2 style={headingStyle}>Add a Note</h2>
            <form style={formStyle} onSubmit={handleSaveNote}>
                <div style={formGroupStyle}>
                    <label htmlFor="title" style={labelStyle}>Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        placeholder="Enter title"
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="description" style={labelStyle}>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        placeholder="Write your note here..."
                        style={textAreaStyle}
                    ></textarea>
                </div>
                <button type="submit" style={buttonStyle}>
                    Save Note
                </button>
            </form>
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: '2rem',
    paddingTop: '4rem',
};

const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
    padding: '1rem',
    fontSize: '1rem',
    borderColor: '#004080',
    borderRadius: '5px',
    boxSizing: 'border-box',
};

const textAreaStyle = {
    width: '100%',
    height: '200px',
    resize: 'both',
    padding: '1rem',
    fontSize: '1rem',
    borderColor: '#004080',
    borderRadius: '5px',
    boxSizing: 'border-box',
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
    transition: 'background-color 0.3s',
};

const alertStyle = {
    padding: '1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    marginBottom: '1rem',
    textAlign: 'center',
    width: '100%',
    maxWidth: '600px',
};

export default AddNote;
