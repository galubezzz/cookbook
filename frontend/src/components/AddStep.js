import React, {useState, useEffect} from "react"
import {withRouter} from "react-router-dom"
import axios from "axios";


export default function AddStep(props) {
    const stepUrl = "http://127.0.0.1:8000/api/v1/steps/";
    const id = parseInt(props.match.params.id);
    const [step, setStep] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
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
        console.log('--file event', event.target.files[0]);

        setStep({
            ...step,
            pic: event.target.files[0]
        });
        setFileUploaded(true);
    }
    function saveStep() {
        const url = 'http://127.0.0.1:8000/api/v1/steps/';
        const data = new FormData();
        if (fileUploaded) {
            data.append('pic', step.pic, step.pic.name);
        };
        data.append('name', step.name);
        data.append('description', step.description);
        data.append('step_number', step.step_number);
        data.append('recipe', id);

        axios.post(url, data)
            .then((response) => {
                console.log('--response', response);
                if (response.status === 201) {
                    setSaved(true);

                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            });
    }
    return(
        <div>
            {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
                    <p>
                        {message}
                    </p>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-1 col-form-label">Name:</label>
                <div className="col-sm-8">
                    <input name="name" id="name" className="form-control pr-2" onChange={changeName}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="description" className="col-sm-1 col-form-label">Description:</label>
            <div className="col-sm-8">
                <textarea name="description" className="form-control" id="description" aria-multiline="true"
                          onChange={changeDesc}/>
            </div>
            </div>
             <div className="form-group row">
                <label htmlFor="number" className="col-sm-1 col-form-label">Step number:</label>
                <div className="col-sm-8">
                    <input name="number" id="number" type="number" step="0.01" className="form-control pr-2" onChange={changeNumber}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="pic" className="col-sm-1 col-form-label">Pic:</label>
                <div className="col-sm-8">
                    <input name="pic" className="form-control-file" id="pic" type="file" onChange={changeFile}/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-9">
                    <button className="btn btn-primary btn-block" onClick={saveStep}> Save Step</button>
                </div>
            </div>
        </div>

    )

}