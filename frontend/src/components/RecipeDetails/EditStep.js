import React, {useEffect, useState} from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import UserContext from "../../userContext";
import StepForm from "./Forms/StepForm";

const url = (id) => `http://127.0.0.1:8000/api/v1/steps/${id}/`;

function EditStep(props) {
    const [step, setStep] = useState([]);
    const [message, setMessage] = useState("");
    const id = props.id;
    const [fileUploaded, setFileUploaded] = useState(false);
    const [saved, setSaved] = useState(false);
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

    function saveStep(data) {
        // const data = new FormData();
        // if (fileUploaded) {
        //     data.append('pic', step.pic, step.pic.name);
        // }
        // data.append('name', step.name);
        // data.append('description', step.description);
        // data.append('step_number', step.step_number);

        axios.patch(url(id), data, {headers: {"Authorization": `Token ${token}`}})
            .then((response) => {
                console.log('--response', response);
                if (response.status === 200) {
                    setSaved(true);
                    props.onSave(response.data);

                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            });
    }

    return (
        <>
            <li className="list-group-item">
            <StepForm step={step} onSave={saveStep}/>
            </li>
        </>
    )
}

export default withRouter(EditStep)