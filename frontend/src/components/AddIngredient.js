import React, {useState, useEffect} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import IngredientForm from "./RecipeDetails/Forms/IngredientForm";

function AddIngredients(props) {
    const ingredientUrl = "http://127.0.0.1:8000/api/v1/ingredients/";
    const unitUrl = "http://127.0.0.1:8000/api/v1/units/";

    let id = props.match.params.id;

    const [ingredient, setIngredient] = useState({recipe: id, unit: null});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');

    function saveIngredient(ingredient) {
        axios.post(ingredientUrl, ingredient).then((response) => {
            console.log('--response', response);
            if (response.status === 201) {
                setSaved(true);
                Array.from(document.querySelectorAll("input")).forEach(
                    input => input.value = "");
                setIngredient({
                    unit: null,
                    recipe: id,
                });
                //setSelectValue(null);
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