import React, {useState, useEffect} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import {baseUrl} from '../utils'

function UserLogin(props) {
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const url = `${baseUrl}/api/v1/login/`;

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
                props.onLogin({
                    id: response.data.id,
                    token: response.data.token,
                    username: response.data.username,
                });
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('id', response.data.id)
                props.history.push("/");
            }
        }).catch((error) => {
            console.log(error.response.data);
        })
    }

    return (
        <>
            <div className="head-title">
                <div className="container">
                    <h2 className="page-title">Login</h2>
                </div>
            </div>
            <div id="main">
                <div className="container">
                    <div class="col-12 col-md-6">
                        <div class="acc-box equal">
                            <h2>Login</h2>
                            <p><em>Welcome back. Log in using your e-mail and password.</em></p>
                            <form>
                                <div class="form-group">
                                    <label for="InputEmailAcc1">Username *</label>
                                    <input type="email" class="form-control" id="InputEmailAcc1"
                                           placeholder="Enter email" onChange={changeUsername}/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password *</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1"
                                           placeholder="Password" onChange={changePassword}/>
                                </div>
                                <button type="submit" class="btn btn-primary" onClick={loginUser}>Login</button>
                            </form>
                        </div>
                    </div>
                    {/*<form>*/}
                    {/*    <div className="form-group row">*/}
                    {/*        <label htmlFor="name" className="col-sm-1 col-form-label">Username:</label>*/}
                    {/*        <div className="col-sm-8">*/}
                    {/*            <input name="name" id="name" className="form-control pr-2" onChange={changeUsername}/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group row">*/}
                    {/*        <label htmlFor="name" className="col-sm-1 col-form-label">Password:</label>*/}
                    {/*        <div className="col-sm-8">*/}
                    {/*            <input name="name" id="name" type="password" className="form-control pr-2"*/}
                    {/*                   onChange={changePassword}/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group row">*/}
                    {/*        <div className="col-sm-9">*/}
                    {/*            <button className="btn btn-primary btn-block" onClick={loginUser}>Login</button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</form>*/}
                </div>
            </div>
        </>
    )
}

export default withRouter(UserLogin)