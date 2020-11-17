import React from "react";

export default function Step(props) {
    const {step, isEditable, onEdit} = props;

    return (
        <>
            <h3>{step.name}</h3>
            <div>{step.description}</div>
            <img src={step.pic}/>
            {isEditable ? <button onClick={onEdit}>Edit Step</button> : null}
        </>
    )
}