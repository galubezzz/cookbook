import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";
import {baseUrl} from '../utils'
import RecipeThumb from "./RecipeThumb";
import UserRecipes from "./UserRecipes";

const getUserURL = `${baseUrl}/api/v1/users/`;

function UserAccount(props) {
    const [user, setUser] = useState();
    const [userParams, setUserParams] = useState();
    const [favParams, setFavParams] = useState();
    const [heading, setHeading] = useState("");
    const [canEdit, setCanEdit] = useState(props.user && props.user.username === props.match.params.username);


    useEffect(() => {
        if (props.location.pathname === '/my-account/') {
            setCanEdit(true);
            setHeading("My account");
        } else {
            setHeading(props.match.params.username + " account");
        }
    });

    useEffect(() => {
        if (props.location.pathname === '/my-account/') {
            setUserParams({username: props.user.username});
        } else {
            setUserParams(props.match.params);
        }
    }, []);

    useEffect(() => {
    if (userParams){
        axios.get(getUserURL, {params: userParams}).then((response) => {
            setUser(response.data[0]);
        });
    }

    }, [userParams]);





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


                                {user ? <UserRecipes user={user}/> : null}


                            </div>

                        </div>


                    </div>
                </div>
            </div>

        </>
    ) : null
}

export default withRouter(UserAccount)