import React, {useState} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'


function UserRegistration(props) {
    const registerUrl = 'http://127.0.0.1:8000/api/v1/register/';
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [saved, setSaved] = useState(false)
    const [message, setMessage] = useState('')

    function changeUsername(event) {
        setUser({
            ...user,
            username: event.target.value,
        });
        console.log(user.username);
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

    function registerUser(event) {
        event.preventDefault();
        console.log(user);
        if (formErrors.password) {
            console.log('Ебать ошибка!');
        } else {
            console.log('Password matched');
            const newUser = {
                username: user.username,
                email: user.email,
                password: user.password,
            }
            axios.post(registerUrl, newUser).then((response) => {
                console.log('--------response', response);
                if (response.status === 201) {
                    setSaved(true);
                    props.history.push('/');
                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            }).catch((error) => {
                setMessage(JSON.stringify(error.response.data));
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
                <div className="container">
                    <div className="col-12 col-md-6">
                        <div className="acc-box equal">
                            <h2>Register</h2>
                            <p><em>If you don't have account yet.</em></p>
                            <form onSubmit={registerUser}>
                                <div className="form-group">
                                    <label htmlFor="completeName">Username</label>
                                    <input type="text" className="form-control" id="completeName"
                                           placeholder="ex. foodlover" onChange={changeUsername}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputEmailAcc2">Email address *</label>
                                    <input type="email" id="InputEmailAcc2"
                                           placeholder="you@email.com"
                                           onChange={changeEmail}
                                           className={formErrors.email ? 'form-control pr-2 is-invalid' : 'form-control'}/>
                                    {formErrors.email !== null &&
                                    <div className='invalid-feedback'>{formErrors.email}</div>}
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="password" className="col-sm-1 col-form-label">Password:</label>
                                    <div className="col-sm-8">
                                        <input name="password"
                                               id='pwd'
                                               type="password"
                                               onChange={changePassword}
                                               className={formErrors.password ? 'form-control pr-2 is-invalid' : 'form-control pr-2'}/>
                                        {formErrors.password !== null &&
                                        <div className='invalid-feedback'>{formErrors.password}</div>}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="repeatPassword" className="col-sm-1 col-form-label">Repeat
                                        Password:</label>
                                    <div className="col-sm-8">
                                        <input name="repeatPassword"
                                               id="repeatPassword"
                                               type="password"
                                               onChange={changeRepeatedPassword}
                                               className={formErrors.password ? 'form-control pr-2 is-invalid' : 'form-control pr-2'}/>
                                        {formErrors.password !== null &&
                                        <div className='invalid-feedback'>{formErrors.password}</div>}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(UserRegistration);