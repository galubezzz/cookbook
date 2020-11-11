import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";
import Ingredient from "./Ingredient";
import Step from "./Step";

const getRecipeURL = (id) => `http://127.0.0.1:8000/api/v1/recipes/${id}/`;

function RecipeDetails(props) {
    // const { match: { params: id } } = props;
    const id = props.match.params.id;
    const [recipe, setRecipe] = useState();
    const token = props.user.token;

    useEffect(() => {
        axios.get(getRecipeURL(id), { headers: {"Authorization" : `Token ${token}`} })
            .then((response) => {
            setRecipe(response.data);
        })
    }, []);

    function displayIngredients(ingredients) {
        return (<>
            <h2>Ingredients:</h2>
            {ingredients.map((ingredient) => {
                return (<>
                    <Ingredient ingredient={ingredient}/>
                    <Link to={`/edit-ingredient/${ingredient.id}`}>Edit ingredient</Link>
                </>)
            })}
        </>)
    }

    function displaySteps(steps) {
        return (<>
            <h2>Steps:</h2>
            {steps.map((step) => {
                return <Step step={step}/>
            })}
        </>)
    }

    return recipe ? (
        <div>
            <h1>Recipe details</h1>
            <div>{recipe.name}</div>
            <div>{recipe.description}</div>
            <img src={recipe.pic}/>
            <p/>
            {recipe.ingredients_in_recipe ?
                displayIngredients(recipe.ingredients_in_recipe) : null}
            {recipe.steps_in_recipe ?
            displaySteps(recipe.steps_in_recipe) : null}
            <Link to={`/edit-recipe/${recipe.id}`}>Edit</Link>

        </div>
    ) : null;
};

export default withRouter(RecipeDetails)