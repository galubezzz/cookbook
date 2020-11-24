import React, {useState} from 'react';
import StepViewSwitch from "./StepViewSwitch";
import AddStep from "../AddStep";


export default function StepList(props) {
    const {recipe_id, isEditable} = props;
    const [steps, setSteps] = useState(props.steps);
    const [addStepMode, setAddStepMode] = useState(false);
    const renderStep = (step) => <StepViewSwitch isEditable={isEditable} step={step}/>;

    function saveStep(new_step) {
        setAddStepMode(false);
        setSteps([...steps, new_step]);
    }
        return (
            <>
                <h4>Steps: {isEditable ? <i className="fas fa-plus icon" onClick={()=>{setAddStepMode(true)}}></i>: null}</h4>
                {addStepMode ? <AddStep id={recipe_id} onSave={saveStep}/> : null}
                <ul className="list-group list-group-flush">
                    {steps.map(renderStep)}
                </ul>
            </>
        )
    }