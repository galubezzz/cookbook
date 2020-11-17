import React from 'react';
import StepViewSwitch from "./StepViewSwitch";


export default function StepList(props) {
    const {steps, isEditable} = props

    const renderStep = (step) => <StepViewSwitch isEditable={isEditable} step={step}/>

    return (
        <>
            <h4>Steps:</h4>
            <ul className="list-group list-group-flush">
                {steps.map(renderStep)}
            </ul>
        </>
    )
}