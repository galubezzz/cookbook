import React, {useState} from "react";
import axios from "axios";
import ConfirmDelete from "./ConfirmDelete";

export default function Step(props) {
    const {step, isEditable, onEdit} = props;
    const deleteUrl = (id) => `http://127.0.0.1:8000/api/v1/steps/${id}/`
    const [show, setShow] = useState(false);

    function onAgreeToDelete() {
        setShow(false);
        axios.delete(deleteUrl(step.id)).then((response) => {
            if (response.status === 204) {
                console.log("Deleted succesfully");
                props.onDelete()
            }
        })
    }

    function onDisagree() {
        setShow(false);
    }

    function onDelete() {
        setShow(true);
    }

    return (
        <>
            <li className="list-group-item">
                <h5>{step.name} {isEditable ? <>
                    <i className="fas fa-pen icon" onClick={onEdit}></i>
                    <div style={{position: "relative"}} className="icon-div">
                        <i className="fas fa-trash-alt icon" onClick={onDelete}></i>
                        <ConfirmDelete onAgree={onAgreeToDelete} show={show} onDisagree={onDisagree}
                                       itemType={"step"}
                        />
                    </div>
                </> : null}
                </h5>
                <img className="card-img mb-2" src={step.pic}/>
                <div className="card-text">{step.description}</div>
            </li>
        </>
    )
}