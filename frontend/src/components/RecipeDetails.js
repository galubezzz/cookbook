import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";
import Ingredient from "./Ingredient";
import Step from "./Step";
import EditIngredient from "./EditIngredient";
import EditStep from "./EditStep";
import EditRecipe from "./EditRecipe";

const getRecipeURL = (id) => `http://127.0.0.1:8000/api/v1/recipes/${id}/`;

function RecipeDetails(props) {
    const id = props.match.params.id;
    const [recipe, setRecipe] = useState();
    const token = props.user.token;
    const [editModeIngredient, setEditModeIngredient] = useState({});
    const [editModeStep, setEditModeStep] = useState({});
    const [editRecipeMode, setEditRecipeMode] = useState(false)
    const [isEditable, setEditable] = useState(false)
    const user_id = props.user.id;

    useEffect(() => {
        axios.get(getRecipeURL(id), {headers: {"Authorization": `Token ${token}`}})
            .then((response) => {
                setRecipe(response.data);
                setEditable(user_id === response.data.user_id)
            })
    }, [editModeIngredient, editModeStep, editRecipeMode]);


    function displayIngredients(ingredients) {
        return (<>
            <h2>Ingredients:</h2>
            {ingredients.map((ingredient) => {
                return (<>
                        {isEditable && editModeIngredient[ingredient.id] ?
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
                    {isEditable && editModeStep[step.id] ?
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
                                    </>
                            )
                    }
                </>)
            })}
            </>
        )
    }

    function displayRecipe() {
        return (
            <>
                {isEditable && editRecipeMode ?
                    (<EditRecipe user={props.user} id={recipe.id}
                    onSave={()=>{setEditRecipeMode(false)}}/>)
                    :
                    (
                        <>
                        <h1>Recipe details</h1>
                        <div>{recipe.name}</div>
                        <div>{recipe.description}</div>
                        <img src={recipe.pic}/>
                            { isEditable ?
                        <button onClick={() => {
                            setEditRecipeMode(true)
                        }}>EditRecipe</button> : null
                        }
                        </>
                        )}
                        <p/>
                            {recipe.ingredients_in_recipe ?
                                displayIngredients(recipe.ingredients_in_recipe) : null}
                            {recipe.steps_in_recipe ?
                                displaySteps(recipe.steps_in_recipe) : null}

            </>
        )
    }

    return recipe ? (
        displayRecipe()
    ) : null;
};

export default withRouter(RecipeDetails);