import React, {useState} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {baseUrl} from '../utils';

function UserRegistration(props) {
    const registerUrl = `${baseUrl}/api/v1/register/`;
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [saved, setSaved] = useState(false)
    const [fileUploaded, setFileUploaded] = useState(false);
    const [message, setMessage] = useState('')

    function changeUsername(event) {
        setUser({
            ...user,
            username: event.target.value,
        });
        if (event.target.value.length < 1) {
            setFormErrors({
                ...formErrors,
                username: "Username cannot be empty",
            })
        } else {
            setFormErrors({
                ...formErrors,
                username: null,
            })
        }
    }

    function changeEmail(event) {
        setUser({
            ...user,
            email: event.target.value,
        });
        console.log(user.email);
        if (!validEmailRegex.test(event.target.value)) {
            setFormErrors({
                ...formErrors,
                email: "Email is not valid",
            })
        } else {
            setFormErrors({
                ...formErrors,
                email: null,
            })
        }

    }

    function changePassword(event) {
        setUser({
            ...user,
            password: event.target.value,
        });
        if (event.target.value !== user.repeatedPassword) {
            setFormErrors({
                ...formErrors,
                password: "Passwords didn't match",
            })
        } else {
            setFormErrors({
                ...formErrors,
                password: null,
            })
        }
    }

    function changeRepeatedPassword(event) {
        const repeatedPassword = event.target.value;
        setUser({
            ...user,
            repeatedPassword: repeatedPassword,
        })
        if (repeatedPassword !== user.password) {
            setFormErrors({
                ...formErrors,
                password: "Passwords didn't match",
            })
        } else {
            setFormErrors({
                ...formErrors,
                password: null,
            })
        }
    }

    function changeAbout(event) {
        setUser({
            ...user,
            about: event.target.value,
        });
    }

    function changePic(event){
        setUser({
            ...user,
            pic: event.target.files[0],
            });
    }

    function registerUser(event) {
        event.preventDefault();
        const errors = formErrors.password || formErrors.username || formErrors.email;
        if (errors) {
            return null;
        } else {
            const data = new FormData();
            data.append("username", user.username);
            if (user.email) {data.append("email", user.email);}
            data.append("password", user.password);
            if (user.pic) {data.append('pic', user.pic, user.pic.name);}
            if (user.about) {data.append("about", user.about);}
            axios.post(registerUrl, data).then((response) => {
                if (response.status === 201) {
                    setSaved(true);
                    props.history.push('/login');
                }
            }).catch((error) => {
                Object.keys(error.response.data).forEach(e => {
                    switch (e) {
                        case 'username':
                            setFormErrors({
                                ...formErrors,
                                username: error.response.data[e],
                            })
                            break;
                        case 'password':
                            setFormErrors({
                                ...formErrors,
                                password: error.response.data[e],
                            });
                            break;
                    }
                });
            });

        }
    }

    return (
        <>
            <div className="head-title">
                <div className="container">
                    <h2 className="page-title">Register</h2>
                </div>
            </div>
            <div id="main">
                <div className="container small-content">
                    <div className="col-12 col-md-6">
                        <div className="acc-box">
                            <h2>Register</h2>
                            <p><em>If you don't have an account yet.</em></p>
                            <form onSubmit={registerUser}>
                                <div className="form-group">
                                    <label htmlFor="completeName">Username*: </label>
                                    <input type="text"
                                           className={formErrors.username ? 'form-control is-invalid' : 'form-control'}
                                           id="completeName"
                                           placeholder="ex. foodlover" onChange={changeUsername}/>
                                    {formErrors.username !== null &&
                                    <div className='invalid-feedback'>{formErrors.username}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputEmailAcc2">Email address*:</label>
                                    <input type="email" id="InputEmailAcc2"
                                           placeholder="you@email.com"
                                           onChange={changeEmail}
                                           className={formErrors.email ? 'form-control is-invalid' : 'form-control'}/>
                                    {formErrors.email !== null &&
                                    <div className='invalid-feedback'>{formErrors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password*:</label>

                                    <input name="password"
                                           id='pwd'
                                           type="password"
                                           onChange={changePassword}
                                           className={formErrors.password ? 'form-control is-invalid' : 'form-control'}/>
                                    {formErrors.password !== null &&
                                    <div className='invalid-feedback'>{formErrors.password}</div>}

                                </div>
                                <div className="form-group">
                                    <label htmlFor="repeatPassword">Repeat
                                        Password*:</label>

                                    <input name="repeatPassword"
                                           id="repeatPassword"
                                           type="password"
                                           onChange={changeRepeatedPassword}
                                           className={formErrors.password ? 'form-control is-invalid' : 'form-control'}/>
                                    {formErrors.password !== null &&
                                    <div className='invalid-feedback'>{formErrors.password}</div>}

                                </div>
                                <div className="form-group">
                                    <label htmlFor="repeatPassword">About you:</label>

                                    <input name="repeatPassword"
                                           id="repeatPassword"
                                           type="text"
                                           onChange={changeAbout}
                                           className={formErrors.about ? 'form-control is-invalid' : 'form-control'}/>
                                    {formErrors.about !== null &&
                                    <div className='invalid-feedback'>{formErrors.about}</div>}

                                </div>
                                <div className="form-group">
                                    <label htmlFor="pic">User Picture:</label>
                                    <input type="file" className="form-control-file" id="pic"
                                           aria-describedby="sizeHelp" onChange={changePic}/>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(UserRegistration);