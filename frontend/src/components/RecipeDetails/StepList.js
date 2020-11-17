import React from 'react';
import StepViewSwitch from "./StepViewSwitch";


export default function StepList(props){
    const {steps, isEditable, onSave} = props

    const renderStep = (step) => <StepViewSwitch isEditable={isEditable} step={step} onSave={onSave}/>

    return (
        <>
            <h2>Steps:</h2>
            {steps.map(renderStep)}
        </>
    )
}