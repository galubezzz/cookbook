import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";


function StepForm(props) {
    const id = props.match.params.id;
    const [step, setStep] = useState({recipe: id});
    const [fileUploaded, setFileUploaded] = useState(false);



    useEffect(() => {
        if (props.step) {
            setStep(props.step);}
    }, [props.step]);

    function changeName(event) {
        setStep({
            ...step,
            name: event.target.value,
        })
    }

    function changeDesc(event) {
        setStep({
            ...step,
            description: event.target.value,
        })
    }

    function changeNumber(event) {
        setStep({
            ...step,
            step_number: event.target.value,
        })
    }

    function changeFile(event) {

        setStep({
            ...step,
            pic: event.target.files[0]
        });
        setFileUploaded(true);
    }

    function saveStep(event) {
        event.preventDefault();
        const data = new FormData();
        if (fileUploaded) {
            data.append('pic', step.pic, step.pic.name);
        }
        data.append('name', step.name);
        data.append('description', step.description);
        data.append('step_number', step.step_number);
        data.append('recipe', step.recipe);
        props.onSave(data);
    }

    function onCancel(event) {
        event.preventDefault();
        props.onCancel();
    }

    return (
        <>
            <li className="list-group-item">
            <form>
                <div className="form-group row">
                    <label htmlFor="number" className="col-sm-12 col-md-12 col-lg-2 col-form-label">Step number:</label>
                    <div className="col-sm-12 col-md-10 col-lg-3">
                        <input name="number" id="number" type="number" min="1" step="1" className="form-control pr-2"
                               onChange={changeNumber} value={step.step_number}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-12 col-md-12 col-lg-2 col-form-label">Name:</label>
                    <div className="col-sm-12 col-md-10 col-lg-3">
                        <input name="name" id="name" className="form-control pr-2" onChange={changeName}
                               value={step.name}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="description" className="col-sm-12 col-md-12 col-lg-2 col-form-label">Description:</label>
                    <div className="col-sm-12 col-md-10 col-lg-3">
                <textarea name="description" className="form-control" id="description" aria-multiline="true"
                          onChange={changeDesc} value={step.description}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="pic" className="col-sm-12 col-md-12 col-lg-2 col-form-label">Pic:</label>
                    <div className="col-sm-12 col-md-10 col-lg-3">
                        <input name="pic" className="form-control-file" id="pic" type="file" onChange={changeFile}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12 col-md-10 col-lg-5">
                        <button className="btn btn-primary btn-block" onClick={saveStep}> Save Step</button>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-12 col-md-10 col-lg-5">
                        <button className="btn btn-primary btn-block" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </form>
            </li>
        </>
    )
}

export default  withRouter(StepForm)