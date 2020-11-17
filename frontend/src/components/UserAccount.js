import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {withRouter, Link} from "react-router-dom";

const getUserURL = `http://127.0.0.1:8000/api/v1/users/`;

function UserAccount(props) {
    const [user, setUser] = useState();
    const token = props.user.token;
    useEffect(() => {
        axios.get(getUserURL, {headers: {"Authorization": `Token ${token}`}}).then((response) => {
            setUser(response.data[0]);
        })
    }, []);
    return user ? (

        <>
            <h1>My account details</h1>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <Link to="/edit-user-details">Edit</Link>
        </>
    ) : null
}

export default withRouter(UserAccount)