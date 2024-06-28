import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Modal from './Modal';

function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote, deleteNote } = context;
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            getNotes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOpenModal = (note) => {
        setCurrentNote({
            id: note._id,
            title: note.title,
            description: note.description,
            tag: note.tag,
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
    };

    const handleUpdateNote = (e) => {
        e.preventDefault();
        editNote(currentNote.id, currentNote.title, currentNote.description, currentNote.tag);
        setAlert('Note edited successfully!');
        setTimeout(() => {
            setAlert(null);
        }, 3000);
        setShowModal(false);
    };

    const handleDeleteNote = (id) => {
        deleteNote(id);
        setAlert('Note deleted successfully!');
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    return (
        <div style={notesContainerStyle}>
            <h2>Your Notes</h2>
            {alert && <div style={alertStyle}>{alert}</div>}
            {notes.length > 0 ? (
                notes.map((note) => (
                    <NoteItem key={note._id} note={note} onEdit={handleOpenModal} onDelete={handleDeleteNote} />
                ))
            ) : (
                <p>No notes available.</p>
            )}
            {showModal && (
                <Modal
                    show={showModal}
                    handleClose={handleCloseModal}
                    note={currentNote}
                    handleUpdate={handleUpdateNote}
                    handleChange={handleChange}
                />
            )}
        </div>
    );
}

const notesContainerStyle = {
    textAlign: 'center',
    padding: '1rem',
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
    margin: '0 auto',
};

export default Notes;
