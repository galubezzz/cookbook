import React, {useState, useEffect} from "react"
import {withRouter} from "react-router-dom"
import axios from "axios";
import StepForm from "./RecipeDetails/Forms/StepForm";


function AddStep(props) {
    const [step, setStep] = useState([]);
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const url = 'http://127.0.0.1:8000/api/v1/steps/';

    function saveStep(data) {
        axios.post(url, data)
            .then((response) => {
                if (response.status === 201) {
                    setSaved(true);
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