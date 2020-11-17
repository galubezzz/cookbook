import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Step from "./RecipeDetails/Step";
import EditStep from "./RecipeDetails/EditStep";
import EditRecipe from "./EditRecipe";
import IngredientsList from './RecipeDetails/IngredientsList';
import StepList from './RecipeDetails/StepList'
import UserContext from "../userContext";
const getRecipeURL = (id) => `http://127.0.0.1:8000/api/v1/recipes/${id}/`;

function RecipeDetails(props) {
    const id = props.match.params.id;
    const [recipe, setRecipe] = useState();
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

    function displayRecipe() {
        const showEditForm = isEditable && editRecipeMode;
        return (
            <div className="col-lg-8">
            <div className="card m-2 p-2">
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
                            <h2>{recipe.name}
                                {isEditable ? <i className="fas fa-pen h1icon" onClick={() => {
                                    setEditRecipeMode(true)
                                }}></i>  : null}
                            </h2>

                            <img className="card-img" src={recipe.pic}/>
                            <div className="card-text text-muted">{recipe.description}</div>
                        </>
                    )}
                {recipe.ingredients_in_recipe ?
                    <IngredientsList ingredients={recipe.ingredients_in_recipe} isEditable={isEditable}/> : null}
                {recipe.steps_in_recipe ?
                     <StepList steps={recipe.steps_in_recipe} isEditable={isEditable}/> : null}

            </div>
            </div>
        )
    }

    return recipe ? displayRecipe() : null;
};

export default withRouter(RecipeDetails);