import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";
import Ingredient from "./Ingredient";
import Step from "./Step";
import EditIngredient from "./EditIngredient";
import EditStep from "./EditStep";

const getRecipeURL = (id) => `http://127.0.0.1:8000/api/v1/recipes/${id}/`;

function RecipeDetails(props) {
    // const { match: { params: id } } = props;
    const id = props.match.params.id;
    const [recipe, setRecipe] = useState();
    const token = props.user.token;
    const [editModeIngredient, setEditModeIngredient] = useState({});
    const [editModeStep, setEditModeStep] = useState({});

    useEffect(() => {
        axios.get(getRecipeURL(id), {headers: {"Authorization": `Token ${token}`}})
            .then((response) => {
                setRecipe(response.data);
            })
    }, [editModeIngredient, editModeStep]);


    function displayIngredients(ingredients) {
        return (<>
            <h2>Ingredients:</h2>
            {ingredients.map((ingredient) => {
                return (<>
                        {editModeIngredient[ingredient.id] ?
                            (
                                <>
                                    <EditIngredient user={props.user} id={ingredient.id}
                                                    onSave={() => setEditModeIngredient({
                                                        ...editModeIngredient,
                                                        [ingredient.id]: false
                                                    })}/>
                                </>
                            )
                            :
                            (
                                <>
                                    <Ingredient ingredient={ingredient}/>
                                    <button onClick={() => {
                                        setEditModeIngredient({...editModeIngredient, [ingredient.id]: true})
                                    }}>Edit Ing
                                    </button>
                                    {/*<Link to={`/edit-ingredient/${ingredient.id}`}>Edit ingredient</Link>*/}
                                </>

                            )

                        }
                    </>
                )
            })}
        </>)
    }

    function displaySteps(steps) {
        return (<>
            <h2>Steps:</h2>
            {steps.map((step) => {
                return (<>
                    {editModeStep[step.id] ?
                            (
                                <>
                                    <EditStep user={props.user} id={step.id}
                                                    onSave={() => setEditModeStep({
                                                        ...editModeStep,
                                                        [step.id]: false
                                                    })}/>
                                </>
                            )
                            :
                            (
                                <>
                                    <Step step={step}/>
                                    <button onClick={()=>{
                                        setEditModeStep({...editModeStep, [step.id]: true})
                                    }}>Edit step</button>
                                    {/*<Link to={`/edit-step/${step.id}`}>Edit step</Link>*/}
                                    </>
                            )
                    }
                </>)
            })}
            </>
        )
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
            <Link to={`/edit-recipe/${recipe.id}`}>Edit recipe</Link>

        </div>
    ) : null;
};

export default withRouter(RecipeDetails)