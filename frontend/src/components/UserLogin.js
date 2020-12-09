import React, {useState, useEffect} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import {baseUrl} from '../utils'

function UserLogin(props) {
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
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
            setFormErrors({username: null, password: null});
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
            Object.keys(error.response.data).forEach(e => {
                switch (e) {
                    case 'username':
                        console.log('we got here');
                        setFormErrors({
                            ...formErrors,
                            username: error.response.data[e],
                        });
                        break;
                    case 'password':
                        setFormErrors({
                            ...formErrors,
                            password: error.response.data[e],
                        });
                        break;
                    case 'non_field_errors':
                        console.log(e);
                        setFormErrors({
                            ...formErrors,
                            username: error.response.data[e],
                        });
                        break;
                }
            })
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
                <div className="container small-content">
                    <div class="col-12 col-md-6">
                        <div class="acc-box">
                            <h2>Login</h2>
                            <p><em>Welcome back. Log in using your e-mail and password.</em></p>
                            <form>
                                <div class="form-group">
                                    <label for="InputEmailAcc1">Username *</label>
                                    <input type="email"
                                    className={formErrors.username ? 'form-control is-invalid' : 'form-control'}
                                           id="InputEmailAcc1"
                                           placeholder="Enter email" onChange={changeUsername}/>
                                    {formErrors.username !== null &&
                                    <div className='invalid-feedback'>{formErrors.username}</div>}
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password *</label>
                                    <input type="password"
                                           className={formErrors.password ? 'form-control is-invalid' : 'form-control'}

                                           id="exampleInputPassword1"
                                           placeholder="Password" onChange={changePassword}/>{
                                    (formErrors.password) ?
                                    <div className='invalid-feedback'>{formErrors.password}</div> : null}
                                </div>
                                {formErrors.other !== null &&
                                    <div className='error' style={{color:"red"}}>{formErrors.other}</div>}
                                <button type="submit" class="btn btn-primary btn-block" onClick={loginUser}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(UserLogin)