import React from "react";
import axios from "axios";

export default function Step(props) {
    const {step, isEditable, onEdit} = props;
    const deleteUrl = (id) => `http://127.0.0.1:8000/api/v1/steps/${id}/`

    function onDelete() {
        let confirmation = window.confirm("Are you sure you want delete this ingredient?")
        if (confirmation) {
            axios.delete(deleteUrl(step.id)).then((response) => {
                if (response.status === 204) {
                    console.log("Deleted succesfully");
                    props.onDelete()
                }
            })
        }
    }

    return (
        <>
            <li className="list-group-item">
                <h5>{step.name} {isEditable ? <>
                    <i className="fas fa-pen icon card-link" onClick={onEdit}></i>>
                    <i className="fas fa-trash-alt icon" onClick={onDelete}></i>
                    </>: null}
                </h5>
                <img className="card-img mb-2" src={step.pic}/>
                <div className="card-text">{step.description}</div>
            </li>
        </>
    )
}