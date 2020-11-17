import React from "react";

export default function Step(props) {
    const {step, isEditable, onEdit} = props;

    return (
        <>
            <li className="list-group-item">
                <h5>{step.name} {isEditable ?
                    <i className="fas fa-pen icon card-link" onClick={onEdit}></i> : null}</h5>
                <img className="card-img" src={step.pic}/>
                <div className="card-text">{step.description}</div>
            </li>
        </>
    )
}