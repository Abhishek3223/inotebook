import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const noteitem = props.note;
    const context = useContext(noteContext);
    const { DeleteNote } = context
    const update = props.update
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{noteitem.title}</h5>
                    <p className="card-text">
                        {noteitem.discription ? (noteitem.discription).slice(0, 88) + "..." : "..."}
                    </p>
                    <img style={{ "width": "30px", "margin": "5px" }} onClick={() => { DeleteNote(noteitem._id); props.ShowAlerts("Deleted the Note", "danger") }} src="./delete.png" alt="" srcSet="" />
                    <img className="float-right"
                        onClick={() => { update(noteitem) }}
                        style={{ "width": "30px", "margin": "5px" }} src="./edit.png" alt="" srcSet="" />
                </div>
            </div>
        </div>
    )
}

export default Noteitem