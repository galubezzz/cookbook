import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Step from "./Step";
import EditStep from "./EditStep";
import EditRecipe from "./EditRecipe";
import IngredientsList from './RecipeDetails/IngredientsList';
import UserContext from "../userContext";

const getRecipeURL = (id) => `http://127.0.0.1:8000/api/v1/recipes/${id}/`;

function RecipeDetails(props) {
    const id = props.match.params.id;
    const [recipe, setRecipe] = useState();
    const [editModeStep, setEditModeStep] = useState({});
    const [editRecipeMode, setEditRecipeMode] = useState(false);
    const [isEditable, setEditable] = useState(false)
    const user = React.useContext(UserContext);
    const token = user.token;
    const user_id = user.id;

    useEffect(() => {
        axios.get(getRecipeURL(id), {headers: {"Authorization": `Token ${token}`}})
            .then((response) => {
                setRecipe(response.data);
                setEditable(user_id === response.data.user_id)
            })
    }, [editRecipeMode]);

    function displaySteps(steps) {
        return (<>
                <h2>Steps:</h2>
                {steps.map((step) => {
                    return (<>
                        {isEditable && editModeStep[step.id] ?
                            (
                                <EditStep user={props.user} id={step.id}
                                          onSave={() => setEditModeStep({
                                              ...editModeStep,
                                              [step.id]: false
                                          })}/>
                            )
                            :
                            (
                                <>
                                    <Step step={step}/>
                                    <button onClick={() => {
                                        setEditModeStep({...editModeStep, [step.id]: true})
                                    }}>Edit step
                                    </button>
                                </>
                            )
                        }
                    </>)
                })}
            </>
        )
    }

    const onIngredientSave = () => setEditRecipeMode(false);

    function displayRecipe() {
        const showEditForm = isEditable && editRecipeMode;
        return (
            <>
                {showEditForm ? (
                        <EditRecipe
                            user={user}
                            id={recipe.id}
                            onSave={() => {
                                setEditRecipeMode(false)
                            }}
                        />)
                    : (
                        <>
                            <h1>Recipe details</h1>
                            <div>{recipe.name}</div>
                            <div>{recipe.description}</div>
                            <img src={recipe.pic}/>
                            {isEditable ?
                                <button onClick={() => {
                                    setEditRecipeMode(true)
                                }}>EditRecipe</button> : null
                            }
                        </>
                    )}
                {recipe.ingredients_in_recipe ?
                    <IngredientsList ingredients={recipe.ingredients_in_recipe} isEditable={isEditable} onSave={onIngredientSave}/> : null}
                {recipe.steps_in_recipe ? displaySteps(recipe.steps_in_recipe) : null}

            </>
        )
    }

    return recipe ? displayRecipe() : null;
};

export default withRouter(RecipeDetails);