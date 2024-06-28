import React from 'react';

const Modal = ({ show, handleClose, note, handleUpdate, handleChange }) => {
    const modalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: show ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            zIndex: show ? 1000 : -1,
        },
        modal: {
            backgroundColor: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            width: '500px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(-100px)',
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        },
        title: {
            marginBottom: '1.5rem',
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#333',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '1rem',
            textAlign: 'left',
            color: '#555',
            fontSize: '1rem',
            fontWeight: '500',
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
        },
        textArea: {
            width: '100%',
            height: '100px',
            padding: '0.75rem',
            margin: '0.5rem 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
            resize: 'none',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '1.5rem',
        },
        button: {
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
        },
        saveButton: {
            backgroundColor: '#28a745',
            color: '#fff',
        },
        closeButton: {
            backgroundColor: '#dc3545',
            color: '#fff',
        },
    };

    if (!show) return null;

    return (
        <div style={modalStyle.overlay}>
            <div style={modalStyle.modal}>
                <h2 style={modalStyle.title}>Edit Note</h2>
                <form onSubmit={handleUpdate} style={modalStyle.form}>
                    <label style={modalStyle.label}>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={note.title}
                            onChange={handleChange}
                            style={modalStyle.input}
                            required
                        />
                    </label>
                    <label style={modalStyle.label}>
                        Description:
                        <textarea
                            name="description"
                            value={note.description}
                            onChange={handleChange}
                            style={modalStyle.textArea}
                            required
                        />
                    </label>
                    <label style={modalStyle.label}>
                        Tag:
                        <input
                            type="text"
                            name="tag"
                            value={note.tag}
                            onChange={handleChange}
                            style={modalStyle.input}
                        />
                    </label>
                    <div style={modalStyle.buttonContainer}>
                        <button type="submit" style={{ ...modalStyle.button, ...modalStyle.saveButton }}>
                            Update
                        </button>
                        <button type="button" onClick={handleClose} style={{ ...modalStyle.button, ...modalStyle.closeButton }}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
