import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {baseUrl} from '../utils'
import RecipeThumb from "./RecipeThumb";

function UserRecipes(props) {

    const [recipes, setRecipes] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const [nextLink, setNextLink] = useState('');
    const [nextFavLink, setNextFavLink] = useState('');
    const [count, setCount] = useState(0);
    const [favCount, setFavCount] = useState(0);
    const params = {username: props.user.username};
    const favParams = {username: props.user.username, favorite: true};
    const recipeUrl = `${baseUrl}/api/v1/recipes/`;

    function RenderRecipes(recipes) {
        return recipes.map((recipe) => {
            return <RecipeThumb recipe={recipe} key={recipe.id}/>
        })
    }

    function setLink(link) {
        if (link) {
            setNextLink(link)
        } else {
            setNextLink('')
        }
    }

    function setFavLink(link) {
        if (link) {
            setNextFavLink(link)
        } else {
            setNextFavLink('')
        }
    }

    function loadMoreRecipes(event) {
        axios.get(nextLink, {params: params}).then((response) => {
            const _recipes = [].concat(recipes, response.data.results);
            setRecipes(_recipes);
            setLink(response.data.next)
        })
    }

    function loadMoreFavRecipes(event) {
        axios.get(nextFavLink, {params: favParams}).then((response) => {
            const _recipes = [].concat(favRecipes, response.data.results);
            setFavRecipes(_recipes);
            setFavLink(response.data.next)
        })
    }

    useEffect(() => {
        if (params) {
            axios.get(recipeUrl, {params: params}).then((response) => {
                setRecipes(response.data.results);
                setCount(response.data.count);
                setLink(response.data.next);
            })
        }
    }, []);

    useEffect(() => {
        if (favParams) {
            axios.get(recipeUrl, {params: favParams}).then((response) => {
                setFavRecipes(response.data.results);
                setFavCount(response.data.count);
                setFavLink(response.data.next);
            })
        }
    }, []);

    return <>
        <div className="my-content">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="recipe-tab" data-toggle="tab"
                       href="#recipe"
                       role="tab"
                       aria-controls="recipe"
                       aria-selected="false">Recipes <strong>({count})</strong></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="bookmark-tab" data-toggle="tab" href="#bookmark"
                       role="tab" aria-controls="bookmark"
                       aria-selected="false">Bookmarked
                        Recipes <strong>({favCount})</strong></a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="recipe" role="tabpanel"
                     aria-labelledby="recipe-tab">

                    <div className="row">
                        {recipes.length > 0 ? RenderRecipes(recipes) : "no recipes to show"}

                    </div>
                    {nextLink ? <div className="ordinary-list" onClick={loadMoreRecipes}>Load more recipes</div> : null}

                </div>

                <div className="tab-pane fade" id="bookmark" role="tabpanel"
                     aria-labelledby="bookmark-tab">
                    <div className="row">
                        {favRecipes.length > 0 ? RenderRecipes(favRecipes) : "no recipes to show"}
                    </div>
                    {nextFavLink ?
                        <div className="ordinary-list" onClick={loadMoreFavRecipes}>Load more recipes</div> : null}


                </div>
            </div>

        </div>
    </>
}

export default withRouter(UserRecipes)