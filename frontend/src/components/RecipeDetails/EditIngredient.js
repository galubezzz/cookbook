import React, {useEffect, useState} from 'react'
import axios from "axios";
import {withRouter} from 'react-router-dom';
import UserContext from '../../userContext';
import IngredientForm from "./Forms/IngredientForm";
import {baseUrl} from '../../utils'

function EditIngredient(props){
    const id = parseInt(props.id);
    const [ingredient, setIngredient] = useState({id: id, unit: null});

    const getIngredientUrl = (id) => `${baseUrl}/api/v1/ingredients/${id}/`
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
            if (response.status === 200) {
                props.onSave(response.data);
            }
        }).catch((error => {
            console.log('----message', error)
        }))

    }


    return (
        <>
            <li className="list-group-item">
                <IngredientForm onSave={saveIngredient} onCancel={props.onCancel} ingredient={ingredient}/>
            </li>
        </>
    )
}

export default withRouter(EditIngredient)