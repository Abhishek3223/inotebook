import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const NotesInitial = []

    const [notes, setNotes] = useState(NotesInitial);

    // Get all notes
    const GetNote = async () => {
        console.log("adding a function")

        const Response = await fetch(`${host}/api/notes/fetchNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        });
        const res = await Response.json();
        setNotes(res);


    }

    // add notes
    const AddNote = async (title, discription, tags) => {
        console.log("adding a function -----------------")

        tags = tags[0]
        discription = discription[0]
        title = title[0]

        const Response = await fetch(`${host}/api/notes/addNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, discription, tags })
        });


        const newNote = await Response.json();
        setNotes(notes.concat(newNote))

    }

    const DeleteNote = async (id_toDelete) => {
        console.log(`deleting the note ${id_toDelete}`);

        // api call
        const Response = await fetch(`${host}/api/notes/deleteNotes/${id_toDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

        });


        const res = await Response.json();
        const filtered_notes = notes.filter((notes) => { return notes._id !== id_toDelete })
        setNotes(filtered_notes)
    }

    // editnotes

    const EditNote = async (id_toEdit, title, discription, tags) => {

        // api call to fetch data
        if (tags.constructor === Array) { tags = tags[0] }
        if (discription.constructor === Array) { discription = discription[0] }
        if (title.constructor === Array) { title = title[0] }

        const response = await fetch(`${host}/api/notes/UpdateNotes/${id_toEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, discription, tags })
        });

        const json = await response.json()

        let AllNotes = JSON.parse(JSON.stringify(notes))

        // reaching the note to edit and Editing
        for (let index = 0; index < notes.length; index++) {
            const element = AllNotes[index];
            console.log("Edditing !!")
            if (element._id === id_toEdit) {
                element.title = title
                element.discription = discription
                element.tags = tags
            }
            break;
        }
        setNotes(AllNotes);

    }

    return (
        <NoteContext.Provider value={{ notes, DeleteNote, AddNote, EditNote, GetNote }}>
            {props.children}
        </NoteContext.Provider>


    )
}

export default NoteState;