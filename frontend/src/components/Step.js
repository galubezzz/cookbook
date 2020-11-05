import React from "react";

export default function Step(props) {
    const {step} = props;

    return (
        <>
            <h3>{step.name}</h3>
            <div>{step.description}</div>
            <img src={step.pic}/>
        </>
    )
}