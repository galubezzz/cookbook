import React, {useState, useEffect} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import IngredientForm from "./RecipeDetails/Forms/IngredientForm";
import {baseUrl} from '../utils'
import UserContext from "../userContext";

function AddIngredients(props) {
    const ingredientUrl = `${baseUrl}/api/v1/ingredients/`;
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const user = React.useContext(UserContext);

    function saveIngredient(ingredient) {
        const config = {headers: {"Authorization": `Token ${user.token}`}}
        axios.post(ingredientUrl, ingredient, config).then((response) => {
            if (response.status === 201) {
                setSaved(true);
                props.onSave(response.data)

            } else {
                alert(response)
                setMessage(`was not saved: ${JSON.stringify(response)}`);
            }
        }).catch((error => {
            for (let _ in error) {
                console.log('-----error property', _, error[_]);
            }
            console.log('----message', error.response.data)
        }))
    }


    return (
        <>
            {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
            <p>
                {message}
            </p>
            <IngredientForm onSave={saveIngredient} onCancel={props.onCancel}/>
        </>
    )
}

export default withRouter(AddIngredients);