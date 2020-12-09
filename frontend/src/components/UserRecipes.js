import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {baseUrl} from '../utils'
import RecipeThumb from "./RecipeThumb";

function UserRecipes(props) {

    const [recipes, setRecipes] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const [params, setParams] = useState({username: props.user.username});
    const [favParams, setFavParams] = useState({username: props.user.username, favorite: true});
    const recipeUrl = `${baseUrl}/api/v1/recipes/`;

    function RenderRecipes(recipes) {
        return recipes.map((recipe) => {
            return <RecipeThumb recipe={recipe} key={recipe.id}/>
        })
    }

    useEffect(() => {
        if (params) {
            axios.get(recipeUrl, {params: params}).then((response) => {
                setRecipes(response.data);
            })
        }
    }, [params]);

    useEffect(() => {
        console.log("fav PARAMS!", favParams);
        if (favParams) {
            axios.get(recipeUrl, {params: favParams}).then((response) => {
                setFavRecipes(response.data);
                console.log(response.data);
            })
        }
    }, [favParams]);

    return <>
        <div className="my-content">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="recipe-tab" data-toggle="tab"
                       href="#recipe"
                       role="tab"
                       aria-controls="recipe"
                       aria-selected="false">Recipes <strong>({recipes.length})</strong></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="bookmark-tab" data-toggle="tab" href="#bookmark"
                       role="tab" aria-controls="bookmark"
                       aria-selected="false">Bookmarked
                        Recipes <strong>({favRecipes.length})</strong></a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="recipe" role="tabpanel"
                     aria-labelledby="recipe-tab">

                    <div className="row">
                        {recipes.length > 0 ? RenderRecipes(recipes) : "no recipes to show"}

                    </div>


                </div>

                <div className="tab-pane fade" id="bookmark" role="tabpanel"
                     aria-labelledby="bookmark-tab">
                    <div className="row">
                        {favRecipes.length > 0 ? RenderRecipes(favRecipes) : "no recipes to show"}
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default withRouter(UserRecipes)