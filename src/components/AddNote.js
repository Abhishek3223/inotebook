import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';


const AddNotes = (props) => {
    const context = useContext(noteContext)
    const { AddNote } = context;
    
    const [note, setnote] = useState({ "title": "", "discription": "", "tags": "" })

    const Add = (e) => {
        e.preventDefault();
        AddNote(note.title, note.discription, note.tags);
        props.ShowAlerts("Added a Note", "success")
        setnote({ "title": "", "discription": "", "tags": "" })
    }

    const onchange = (e) => {
        setnote({
            ...note, [e.target.name]: [e.target.value]
        })
    }

    return (
        <div>
            <h2 className=" my-3">Add your note</h2>
            <div>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" name="title" onChange={onchange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Discription</label>
                        <input type="Discription" className="form-control" name="discription" id="exampleInputPassword1" placeholder="Discription" onChange={onchange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Tags</label>
                        <input type="Discription" className="form-control" name="tags" id="exampleInputPassword1" placeholder="tags" onChange={onchange} />
                    </div>

                    <button type="submit" className="btn btn-primary my-3" onClick={Add}>submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNotes