import React, {useState, useEffect} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';

function UserLogin(props) {
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const url = "http://127.0.0.1:8000/api/v1/login/";

    function changeUsername(event) {
        setUser({
            ...user,
            username: event.target.value,
        });
        console.log("--username", user.username);
    }

    function changePassword(event) {
        setUser({
            ...user,
            password: event.target.value,
        });
    }

    function loginUser(event) {
        event.preventDefault();
        axios.post(url, user).then((response) => {
            console.log("--response", response);
            if (response.status === 200) { // 200 == '200' - true
                // 200 === '200' - false
                localStorage.setItem('auth-token', response.data.token);
                localStorage.setItem('username', response.data.username);
                console.log(localStorage['auth-token']);
                props.onLogin({
                    token: response.data.token,
                    username: response.data.username,
                });
                props.history.push("/");
            }
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    return (
        <form>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-1 col-form-label">Username:</label>
                <div className="col-sm-8">
                    <input name="name" id="name" className="form-control pr-2" onChange={changeUsername}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-1 col-form-label">Password:</label>
                <div className="col-sm-8">
                    <input name="name" id="name" type="password" className="form-control pr-2"
                           onChange={changePassword}/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-9">
                    <button className="btn btn-primary btn-block" onClick={loginUser}> Save Recipe</button>
                </div>
            </div>
        </form>
    )
}

export default withRouter(UserLogin)