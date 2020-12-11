import React, {useEffect, useState} from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import UserContext from "../../userContext";
import StepForm from "./Forms/StepForm";
import {baseUrl} from '../../utils'

const url = (id) => `${baseUrl}/api/v1/steps/${id}/`;

function EditStep(props) {
    const [step, setStep] = useState([]);
    const [message, setMessage] = useState("");
    const id = props.id;
    const user = React.useContext(UserContext);
    const token = user.token;

    useEffect(() => {
        axios.get(url(id)).then((response) => {
            if (response.status === 200) {
                console.log('--response', response.data);
                setStep(response.data)
            } else {
                setMessage("Could not load data")
            }
        })
    }, []);



    function saveStep(data) {
     axios.patch(url(id), data, {headers: {"Authorization": `Token ${token}`}})
            .then((response) => {
                if (response.status === 200) {
                    props.onSave(response.data);
                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            });
    }

    return (
        <>
            <li className="list-group-item">
            <StepForm step={step} onSave={saveStep} onCancel={props.onCancel}/>
            </li>
        </>
    )
}

export default withRouter(EditStep)