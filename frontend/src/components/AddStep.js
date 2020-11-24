import React, {useState, useEffect} from "react"
import {withRouter} from "react-router-dom"
import axios from "axios";
import StepForm from "./RecipeDetails/Forms/StepForm";


function AddStep(props) {
    let embededMode= false;
    let id = props.match.params.id;
    if (props.id) {
        embededMode = true;
    }
    const [step, setStep] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const url = 'http://127.0.0.1:8000/api/v1/steps/';

    function saveStep(data) {
        // event.preventDefault();

        // const data = new FormData();
        // if (fileUploaded) {
        //     data.append('pic', step.pic, step.pic.name);
        // };
        // data.append('name', step.name);
        // data.append('description', step.description);
        // data.append('step_number', step.step_number);
        // data.append('recipe', id);

        axios.post(url, data)
            .then((response) => {
                console.log('--response', response);
                if (response.status === 201) {
                    setSaved(true);
                    Array.from(document.querySelectorAll("input")).forEach(
                    input => input.value = "");
                    document.querySelector("textarea").value="";
                    setStep({
                        name: null,
                        description: null,
                        step_number: null,
                        recipe: null,
                    })
                    props.onSave(response.data)

                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            });
    }
    return(
        <>
            {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
            <p>
                {message}
            </p>
            <StepForm onSave={saveStep}/>
        </>
    )
}
export default withRouter(AddStep)