import { useState } from 'react';
import noteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    //ADD a note
    const getNotes = async ()=>{
        //API call
        
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token'), 
            }, 
        })
        const json = await response.json();
        console.log(json)
        //console.log(localStorage.getItem('token'))
        setNotes(json);
        
     
    }






    //ADD a note
    const addNote = async (title,description,tag)=>{
        //TODO:api call
        //API call
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token'),
                
            },
            body: JSON.stringify({title,description,tag})  
        })
        const note = response.json();
        setNotes(notes.concat(note));
        console.log("Added note");
        //console.log(localStorage.getItem('token'));

    }



    //delete a note
    const deleteNote= async (id)=>{

         //API call
         const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token'),
                
            },
        })
        const json = response.json();
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    }



    //edit a note
    const editNote = async (id,title,description,tag)=>{
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token":localStorage.getItem('token'),
                
            },
            body: JSON.stringify({title,description,tag})  
        })
        const json = response.json();



        //LOGIC to edit in client
        const newNotes = notes.map(note =>
            note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(newNotes);

    }



    return (
        <noteContext.Provider value={{ notes, setNotes ,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    );
}

export default NoteState;
