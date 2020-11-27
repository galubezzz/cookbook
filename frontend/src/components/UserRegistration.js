import React, {useState} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {baseUrl} from '../utils';


function UserRegistration(props){
    const registerUrl = `${baseUrl}/api/v1/register/`;
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [saved, setSaved] = useState(false)
    const [message, setMessage] = useState('')

    function changeUsername(event){
        setUser({
            ...user,
            username: event.target.value,
        });
        console.log(user.username);
    }

    function changeEmail(event){
        setUser({
            ...user,
            email: event.target.value,
        });
        console.log(user.email);
        if (!validEmailRegex.test(event.target.value)){
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

    function changePassword(event){
        setUser({
            ...user,
            password: event.target.value,
        });
        if (event.target.value !== user.repeatedPassword){
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

    function changeRepeatedPassword(event){
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

    function registerUser(event){
        event.preventDefault();
        console.log(user);
        if (formErrors.password){
            console.log('Ебать ошибка!');
        } else {
            console.log('Password matched');
            const newUser = {username: user.username,
                       email: user.email,
                       password:user.password,
            }
            axios.post(registerUrl, newUser).then((response) =>{
                if (response.status === 201){
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

    return(
        <>
            {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}

            <div className="card p-2">
                <div className="card-body">
                    <h3 className="card-title">User Registration</h3>
                    <p>
                        <p style={{color: 'red'}}>{message}</p>
                    </p>
                    <form onSubmit={registerUser}>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-1 col-form-label">Username</label>
                            <div className="col-sm-8">
                                <input name="username" id="name"
                                       onChange={changeUsername}
                                       className="form-control pr-2"/>

                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-1 col-form-label">Email</label>
                            <div className="col-sm-8">
                                <input name="email" type="email"
                                       onChange={changeEmail}
                                       className={formErrors.email ? 'form-control pr-2 is-invalid':'form-control pr-2'} />
                                {formErrors.email !== null &&
                                <div className='invalid-feedback'>{formErrors.email}</div>}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-1 col-form-label">Password:</label>
                            <div className="col-sm-8">
                                <input name="password"
                                       id='pwd'
                                       type="password"
                                       onChange={changePassword}
                                       className={formErrors.password ? 'form-control pr-2 is-invalid':'form-control pr-2'} />
                                {formErrors.password !== null &&
                                <div className='invalid-feedback'>{formErrors.password}</div>}
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="repeatPassword" className="col-sm-1 col-form-label">Repeat Password:</label>
                            <div className="col-sm-8">
                                <input name="repeatPassword"
                                       id="repeatPassword"
                                       type="password"
                                       onChange={changeRepeatedPassword}
                                       className={formErrors.password ? 'form-control pr-2 is-invalid':'form-control pr-2'} />
                                {formErrors.password !== null &&
                                <div className='invalid-feedback'>{formErrors.password}</div>}
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-9">
                                <button className="btn btn-primary btn-block">
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default withRouter(UserRegistration);