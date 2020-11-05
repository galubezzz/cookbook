import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Ingredient from "./Ingredient";
import Step from "./Step";

const getRecipeURL = (id) => `http://127.0.0.1:8000/api/v1/recipes/${id}/`;

export default function RecipeDetails(props) {
    // const { match: { params: id } } = props;
    const id = props.match.params.id;
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        axios.get(getRecipeURL(id)).then((response) => {
            setRecipe(response.data);
        })
    }, []);

    return recipe ? (
        <div>
            <h1>Recipe details</h1>
            <div>{recipe.name}</div>
            <div>{recipe.description}</div>
            <img src={recipe.pic}/>
            <p/>
            {recipe.ingredient_in_recipe ?
                recipe.ingredient_in_recipe.map((ingredient)=>{return <Ingredient ingredient={ingredient}/>}) : null}
            {recipe.step_in_recipe ?
            recipe.step_in_recipe.map((step)=>{return <Step step={step}/>}) : null}
            <Link to={`/edit-recipe/${recipe.id}`}>Edit</Link>
        </div>
    ) : null;
};