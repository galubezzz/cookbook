import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";
import {baseUrl} from '../utils'

const getUserURL = `${baseUrl}/api/v1/users/`;

function UserAccount(props) {
    const [user, setUser] = useState();
    const token = props.user.token;

    function Edit() {
        props.history.push("/edit-user-details")
    }

    useEffect(() => {
        axios.get(getUserURL, {headers: {"Authorization": `Token ${token}`}}).then((response) => {
            setUser(response.data[0]);
        })
    }, []);
    return user ? (
        <>
            <div className="head-title">
                <div className="container">
                    <h2 className="page-title">My Account</h2>
                </div>
            </div>
            <div id="main">
                <div className="container">
                    <span>{user.username}</span>
                    <span>({user.email})</span>
                    <a href="/edit-user-details"><i className="fas fa-pen"></i></a>
                </div>
            </div>
        </>
    ) : null
}

export default withRouter(UserAccount)