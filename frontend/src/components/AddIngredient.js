import React, {useState, useEffect} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import IngredientForm from "./RecipeDetails/Forms/IngredientForm";

function AddIngredients(props) {
    const ingredientUrl = "http://127.0.0.1:8000/api/v1/ingredients/";
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');

    function saveIngredient(ingredient) {
        axios.post(ingredientUrl, ingredient).then((response) => {
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
            <IngredientForm onSave={saveIngredient}/>
        </>
    )
}

export default withRouter(AddIngredients);