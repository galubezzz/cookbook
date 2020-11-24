import React, {useState} from 'react';
import EditStep from "./EditStep";
import Step from "./Step";

export default function StepViewSwitch(props){
    const [isEditMode, setEditMode] = useState(false);
    const {isEditable, step} = props;
    const showEditForm = isEditable && isEditMode;
    const [stepFromState, setStep] = useState(step);

    const onEditButtonClick = () => {
        setEditMode(true);
    };
    const onStepSave = (updatedStep) => {
        setEditMode(false);
        setStep(updatedStep);
    };

    const onStepDelete = () => {
        setStep(null);
    }

    if (showEditForm) {
        return <EditStep id={step.id} onSave={onStepSave}/>
    } else if (stepFromState){
        return <Step step={stepFromState} onEdit={onEditButtonClick} isEditable={isEditable} onDelete={onStepDelete}/>
    } else {
        return null
    }
}