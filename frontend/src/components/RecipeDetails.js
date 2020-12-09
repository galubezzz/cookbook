import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";
import EditRecipe from "./EditRecipe";
import IngredientsList from './RecipeDetails/IngredientsList';
import StepList from './RecipeDetails/StepList'
import UserContext from "../userContext";
import ConfirmDelete from "./RecipeDetails/ConfirmDelete";
import TagsList from "./RecipeDetails/TagsList";
import {baseUrl} from '../utils';
import SharePopover from "./SharePopover";

const getRecipeURL = (id) => `${baseUrl}/api/v1/recipes/${id}/`;

function RecipeDetails(props) {
    const id = props.match.params.id;
    const [recipe, setRecipe] = useState();

    const [editRecipeMode, setEditRecipeMode] = useState(false);
    const [isEditable, setEditable] = useState(false)
    const [show, setShow] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const user = React.useContext(UserContext);
    const token = user? user.token: null;
    const user_id = user? user.id: 0;
    const deleteUrl = (id) => `${baseUrl}/api/v1/recipes/${id}/`

    useEffect(() => {
        const params = token ? {headers: {"Authorization": `Token ${token}`}} : null;
        axios.get(getRecipeURL(id), params)
            .then((response) => {
                setRecipe(response.data);
                setEditable(user_id === response.data.user_id.id)
            })
    }, [editRecipeMode]);

    const userUrl = (username) => `/user/${username}/`;


    function onAgreeToDelete() {
        axios.delete(deleteUrl(recipe.id), {headers: {"Authorization": `Token ${token}`}}).then((response) => {
            if (response.status === 204) {
                console.log("Deleted succesfully");
                props.history.push('/');
            }
        })
    }

    function onDisagree() {
        console.log('we got here')
        setShow(false);
    }

    function onCloseShare() {
        setShowShare(false);
    }

    function onDelete() {
        setShow(true);
    }

    function displayRecipe() {
        const showEditForm = isEditable && editRecipeMode;
        console.log("------EDIT RECIPE MODE IS:", editRecipeMode);
        return (
            <>
                <div className="head-title">
                    <div className="container">
                        <h2 className="page-title">The Recipe</h2>
                    </div>
                </div>
                <div id="main">
                    <div className="container">
                        <div className="recipe-content">
                            {showEditForm ? <EditRecipe
                                    user={user}
                                    id={recipe.id}
                                    onSave={() => {
                                        setEditRecipeMode(false)
                                    }}
                                    onCancel={() => {
                                        setEditRecipeMode(false)
                                    }
                                    }
                                />
                                : <>
                                    <div className="row">
                                        <div className="col">
                                            <div className="recipe-lvl">
                                                <span>TIME : {recipe.cook_time} min</span>
                                            </div>
                                            <div className="recipe-head">
                                                <h1 className="recipe-title">{recipe.name}</h1>
                                                <div className="recipe-auth">
                                                        <span>Posted by <a
                                                            href={`/user/${recipe.user_id.username}`}>{recipe.user_id.username}</a></span>
                                                </div>
                                                <div className="recipe-finger">

                                                    <div className="box-sharing">
                                                        {isEditable ?
                                                            <>
                                                                <Link to="#" onClick={() => {
                                                                    setEditRecipeMode(true)
                                                                }}><i className="fas fa-pen"
                                                                ></i></Link>
                                                                <Link to="#" onClick={onDelete}>
                                                                    <i className="fas fa-trash-alt"></i>
                                                                </Link>
                                                                <ConfirmDelete onAgree={onAgreeToDelete}
                                                                               show={show}
                                                                               onDisagree={onDisagree}
                                                                               itemType={"recipe"}/>

                                                            </> : null}
                                                        <Link to="#" onClick={() => {
                                                            window.focus();
                                                            window.print()
                                                        }}><i className="fas fa-print"></i></Link>
                                                        <Link to="#" onClick={()=>{setShowShare(true)}}><i className="fas fa-share-alt"></i>
                                                        </Link>
                                                        <SharePopover onClose={onCloseShare} show={showShare}/>
                                                        <Link to="#"><i className="fas fa-bookmark"></i></Link>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <figure className="recipe-pict">
                                                <img src={recipe.pic}/>
                                            </figure>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="detail-desc">
                                                <p><strong>DESCRIPTION</strong></p>
                                                <p>{recipe.description}</p>
                                            </div>
                                            <div className="recipe-tags">
                                                    <span>Tags : {recipe.tags ?
                                                        <TagsList tags={recipe.tags}/> : null}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-section"></div>


                                </>}
                            <div className="row small-content ">
                                <div className="ingredient col-md-6">
                                    {recipe.ingredients_in_recipe ?
                                        <IngredientsList recipe_id={recipe.id}
                                                         ingredients={recipe.ingredients_in_recipe}
                                                         isEditable={isEditable}/> : null}
                                </div>
                                <div className="direction col-md-6">
                                    {recipe.steps_in_recipe ?
                                        <StepList recipe_id={recipe.id} steps={recipe.steps_in_recipe}
                                                  isEditable={isEditable}/> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return recipe ? displayRecipe() : null;
};

export default withRouter(RecipeDetails);