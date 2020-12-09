import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";
import {baseUrl} from '../utils'
import RecipeThumb from "./RecipeThumb";

const getUserURL = `${baseUrl}/api/v1/users/`;

function UserAccount(props) {
    const [user, setUser] = useState();
    const [userParams, setUserParams] = useState();
    const [params, setParams] = useState({});
    const [favParams, setFavParams] = useState({...props.match.params, favorite: true});
    const [heading, setHeading] = useState("");
    let canEdit = props.user && props.user.username === props.match.params.username;

    const [recipes, setRecipes] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const recipeUrl = `${baseUrl}/api/v1/recipes/`;



    function RenderRecipes(recipes) {
        return recipes.map((recipe) => {
            return <RecipeThumb recipe={recipe} key={recipe.id}/>
        })
    }

    useEffect(() => {
        if (props.location.pathname === '/my-account/') {
            canEdit = true;
            setHeading("My account");
        } else {
            setHeading(props.match.params.username + " account");
        }
    });

    useEffect(() => {
        if (props.match.params) {
            setUserParams(props.match.params);
        } else {
            setUserParams({username: props.user.username});
        }
    }, []);

    useEffect(() => {

        axios.get(getUserURL, {params: userParams}).then((response) => {
            setUser(response.data[0]);
            // setParams({username: response.data[0].username});
            setFavParams({username: response.data[0].username, favorite: true});
        });


    }, [userParams]);

    useEffect(() => {
        console.log("PARAMS!", userParams);
        if (userParams) {
            axios.get(recipeUrl, {params: userParams}).then((response) => {
                setRecipes(response.data);
            })
        }
    }, [userParams]);

    useEffect(() => {
        console.log("fav PARAMS!", favParams);
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
                    <h2 className="page-title">{heading}</h2>
                </div>
            </div>
            <div id="main">
                <div className="container">
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
                                            {canEdit ?
                                                <Link to="/edit-user-details"><i className="fas fa-pen"></i></Link> :
                                                null
                                            }

                                        </div>
                                        <div className="profile-content">
                                            <p>{user.profile.about}</p>
                                        </div>
                                    </div>

                                </div>


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


                            </div>

                        </div>


                    </div>
                </div>
            </div>

        </>
    ) : null
}

export default withRouter(UserAccount)