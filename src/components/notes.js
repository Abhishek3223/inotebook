import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/noteContext'
import Noteitem from './noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let context = useContext(NoteContext);
    const navigate = useNavigate();
    const { GetNote, notes, EditNote } = context
    useEffect(() => {
        if (localStorage.getItem('token')) {
            GetNote();
        }
        else {
            props.ShowAlerts("Please login first !!", "warning")
            navigate('/login')
        }
        // eslint-disable-next-line 
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setnote] = useState({ "id": "", "etitle": "", "ediscription": "", "etags": "" })

    const Update = (currentNote) => {
        // this function works after the edit icon is tappped
        ref.current.click();
        setnote({
            id: currentNote._id,
            etitle: currentNote.title,
            ediscription: currentNote.discription,
            etags: currentNote.tags
        })

    }

    const SubmitNote = (e) => {
        // e.preventDefault();
        console.log(note.ediscription)
        EditNote(note.id, note.etitle, note.ediscription, note.etags)
        props.ShowAlerts("Successfully edited the note", "success")
        refClose.current.click();
    }
    const onchange = (e) => {

        setnote({
            ...note, [e.target.name]: [e.target.value]

        })
    }
    return (
        <div className='container row my-3'>
            <div>

                <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel"> Edit your note</h5>

                            </div>
                            <div className="modal-body">

                                <form>
                                    <div className="form-group my-3">
                                        <label htmlFor="exampleInputEmail1"> Title </label>
                                        <input type="text" className="form-control" id="etitle" aria-describedby="emailHel p" placeholder="Enter title" name="etitle" value={note.etitle} onChange={onchange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Description</label>
                                        {/* 
                                        <textarea className="form-control" type="Discription"  name="ediscription"  id="exampleFormControlTextarea1" value={note.ediscription} rows="3" onChange={onchange}></textarea> */}

                                        <input type="Discription" className="form-control" name="ediscription" id="edescription" placeholder="Discription" value={note.ediscription} onChange={onchange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Tags</label>
                                        <input type="Discription" className="form-control" name="etags" id="exampleInputPassword1" placeholder="tags" value={note.etags} onChange={onchange} />
                                    </div>

                                </form>


                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* disabled={note.etitle.length < 5 || note.edescription.length < 5} */}
                                <button type="button" className="btn btn-primary" onClick={SubmitNote}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="my-3">Your note</h2>
            <div className="row">
                {
                    //    <p> notes</p> 
                    notes?.map((note) => {
                        return <Noteitem key={note._id} ShowAlerts={props.ShowAlerts} update={Update} note={note} />
                    })
                }
            </div>
        </div>
    )
}

export default Notes