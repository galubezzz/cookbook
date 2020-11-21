import React, {useEffect, useState} from 'react'
import axios from "axios";
import {withRouter} from 'react-router-dom';
import Select from 'react-select';
import UserContext from '../../userContext';
import IngredientForm from "./Forms/IngredientForm";

function EditIngredient(props){
    const id = parseInt(props.id);
    const [ingredient, setIngredient] = useState({id: id, unit: null});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');

    const getIngredientUrl = (id) => `http://127.0.0.1:8000/api/v1/ingredients/${id}/`
    const user = React.useContext(UserContext);
    const token = user.token;

    useEffect(() => {
        axios.get(getIngredientUrl(id), {headers: {"Authorization": `Token ${token}`}}).then((response) => {
            setIngredient(
                {
                    id: response.data['id'],
                    quantity: response.data['quantity'],
                    unit: response.data['unit'],
                    name: response.data['name'],
                }
            )
        })
    }, [])



    function saveIngredient(ingredient) {
        axios.patch(getIngredientUrl(id), ingredient, { headers: {"Authorization" : `Token ${token}`} }).then((response) => {
            console.log('--response', response);
            if (response.status === 200) {
                setSaved(true);
                props.onSave(response.data);
            } else {
                alert(response)
                setMessage(`was not saved: ${JSON.stringify(response)}`);
            }
        }).catch((error => {
            console.log('----message', error)
        }))

    }


    return (
        <>
            {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
            <p>
                {message}
            </p>
            <li className="list-group-item">
                <IngredientForm onSave={saveIngredient} ingredient={ingredient}/>
            </li>
        </>
    )
}

export default withRouter(EditIngredient)