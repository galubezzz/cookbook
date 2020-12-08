import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";
import {baseUrl} from '../utils'
import Recipe from "./Recipe";
import RecipeThumb from "./RecipeThumb";

const getUserURL = `${baseUrl}/api/v1/users/`;

function UserAccount(props) {
    const [user, setUser] = useState();
    const [params, setParams] = useState({});
    const [favParams, setFavParams] = useState({favorite: true});
    const token = props.user.token;
    const [recipes, setRecipes] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const recipeUrl = `${baseUrl}/api/v1/recipes/`;

    function Edit() {
        props.history.push("/edit-user-details")
    }

    function RenderRecipes(recipes) {
        return recipes.map((recipe) => {
            return <RecipeThumb recipe={recipe} key={recipe.id}/>
        })
    }

    useEffect(() => {
        axios.get(getUserURL, {headers: {"Authorization": `Token ${token}`}}).then((response) => {
            setUser(response.data[0]);
            setParams({username: response.data[0].username});
            setFavParams({username: response.data[0].username, favorite: true});
        });


    }, []);

    useEffect(() => {
        if (params) {
            axios.get(recipeUrl, {params: params}).then((response) => {
                setRecipes(response.data);
            })
        }
    }, [params]);

    useEffect(() => {
        if (favParams) {
            axios.get(recipeUrl, {params: favParams}).then((response) => {
                setFavRecipes(response.data);
                console.log(response.data);
            })
        }
    }, [favParams]);

    return user ? (
        <>
            <div className="head-title">
                <div className="container">
                    <h2 className="page-title">My Account</h2>
                </div>
            </div>
            <div className="row">

                <div id="primary" className="content-area col-md-8">
                    <div id="content" className="site-content">

                        <div className="profile-details">
                            <figure className="profile-ava">
                                <img src={user.profile.pic} alt="Author"/>
                            </figure>
                            <div className="profile-context">
                                <div className="profile-name">
                                    <h3>{user.username}</h3>
                                    <a href="/edit-user-details"><i className="fas fa-pen"></i></a>
                                </div>
                                <div className="profile-content">
                                    <p>{user.profile.about}</p>
                                </div>
                            </div>

                        </div>


                        <div className="my-content">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="recipe-tab" data-toggle="tab" href="#recipe"
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


                    </div>

                </div>


            </div>


        </>
    ) : null
}

export default withRouter(UserAccount)