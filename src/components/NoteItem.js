import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = ({ note, onEdit, onDelete }) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const handleDelete = () => {
        deleteNote(note._id);
        onDelete(note._id);
    };

    const handleEdit = () => {
        onEdit(note);
    };

    return (
        <div style={noteStyle}>
            <h3 style={titleStyle}>{note.title}</h3>
            <p style={descriptionStyle}>
                {note.description}
                <i 
                    className="fa-solid fa-trash-can mx-2" 
                    onClick={handleDelete} 
                    style={iconStyle}
                ></i> 
                <i 
                    className="fa-solid fa-pen mx-2" 
                    onClick={handleEdit} 
                    style={iconStyle}
                ></i>
            </p>
        </div>
    );
};

const noteStyle = {
    backgroundColor: '#ffffff',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
};

const descriptionStyle = {
    fontSize: '1rem',
    lineHeight: '1.5',
};

const iconStyle = {
    marginLeft: '1rem',
    cursor: 'pointer',
    color: '#333',
    transition: 'color 0.3s',
};

export default NoteItem;
