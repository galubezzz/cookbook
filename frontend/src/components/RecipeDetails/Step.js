import React, {useState} from "react";
import axios from "axios";
import ConfirmDelete from "./ConfirmDelete";
import {baseUrl} from '../../utils'
import {Link} from "react-router-dom";

export default function Step(props) {
    const {step, isEditable, onEdit} = props;
    const deleteUrl = (id) => `${baseUrl}/api/v1/steps/${id}/`
    const [show, setShow] = useState(false);

    function onAgreeToDelete() {
        setShow(false);
        axios.delete(deleteUrl(step.id)).then((response) => {
            if (response.status === 204) {
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
            <li>
                <h5>{step.name} {isEditable ? <>
                    <Link to="#"><i className="fas fa-pen icon" onClick={onEdit}></i></Link>
                    <div style={{position: "relative"}} className="icon-div">
                        <Link to="#"><i className="fas fa-trash-alt icon" onClick={onDelete}></i></Link>
                        <ConfirmDelete onAgree={onAgreeToDelete} show={show} onDisagree={onDisagree}
                                       itemType={"step"}
                        />
                    </div>
                </> : null}
                </h5>
                <img className="card-img mb-2" src={step.pic}/>
                <p>{step.description}</p>
            </li>
        </>
    )
}