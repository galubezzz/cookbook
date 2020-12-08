import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';
import {baseUrl} from '../utils'

function EditUserDetails(props) {
    const url = `${baseUrl}/api/v1/users/`;
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const [user, setUser] = useState();
    const [formErrors, setFormErrors] = useState({});
    const token = props.user.token;


    function changeEmail(event) {
        setUser({
            ...user,
            email: event.target.value
        });
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
            password: event.target.value
        });
    }

    function changeNewPassword(event) {
        setUser({
            ...user,
            newPassword: event.target.value
        });
        if (event.target.value !== user.confirmedNewPassword) {
            setFormErrors({
                ...formErrors,
                newPassword: "Passwords didn't match",
            })
        } else {
            setFormErrors({
                ...formErrors,
                newPassword: null,
            })
        }
    }

    function changeConfirmNewPassword(event) {
        const confirmedNewPassword = event.target.value;
        setUser({
            ...user,
            confirmedNewPassword: event.target.value
        });
        if (confirmedNewPassword !== user.newPassword) {
            setFormErrors({
                ...formErrors,
                newPassword: "Passwords didn't match",
            })
        } else {
            setFormErrors({
                ...formErrors,
                newPassword: null,
            })
        }
    }

    function changeAbout(event) {
        setUser({
            ...user,
            about: event.target.value,
        });
    }

    function changePic(event) {
        setUser({
            ...user,
            pic: event.target.files[0],
        });
    }

    function saveUser(event) {
        event.preventDefault();
        if (!user.password && user.newPassword) {
            setFormErrors({
                ...formErrors,
                password: "This field cannot be empty",
            });
            return
        }
        const formIsValid = (!formErrors.email && !formErrors.newPassword)
        if (formIsValid) {
            const data = new FormData();
            data.append("username", user.username);
            if (user.email) {
                data.append("email", user.email);
            }
            if (user.password) {
                data.append("password", user.password);
            }
            if (user.newPassword) {
                data.append("newPassword", user.newPassword);
            }
            if (user.pic) {
                data.append('pic', user.pic, user.pic.name);
            }
            if (user.about) {
                data.append("about", user.about);
            }
            axios.patch(url, data, {headers: {"Authorization": `Token ${token}`}}).then((response) => {
                    if (response.status === 200) {
                        props.history.push("/my-account")
                    } else {
                        console.log(response)
                    }
                }
            ).catch((error) => {
                console.log(error.response.data);
                setFormErrors({
                    ...formErrors,
                    error: error.response.data.error,
                })
            });
        }
    }

    useEffect(() => {
        axios.get(url, {headers: {"Authorization": `Token ${token}`}}).then((response) => {
            console.log("---response", response.data)
            setUser(response.data[0]);
            console.log(user);
        })
    }, []);


    return user ? (
        <>
            <div className="head-title">
                <div className="container">
                    <h2 className="page-title">My account</h2>
                </div>
            </div>
            <div id="main">
                <div className="container small-content">

                    <form>
                        <div className="form-group row">
                            <label htmlFor="username">Username</label>
                            <input name="username"
                                   type="text"
                                   value={user.username}
                                   disabled
                                   className="form-control"/>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email">Email</label>
                            <input name="email"
                                   type="text"
                                   value={user.email}
                                   onChange={changeEmail}
                                   className={formErrors.email ? 'form-control is-invalid' : 'form-control'}/>
                            {formErrors.email !== null &&
                            <div className='invalid-feedback'>{formErrors.email}</div>}
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password">Old password</label>
                            <input name="password"
                                   type="password"
                                   onChange={changePassword}
                                   className={formErrors.password || formErrors.error ? 'form-control is-invalid' : 'form-control'}/>
                            {formErrors.password !== null &&
                            <div className='invalid-feedback'>{formErrors.password}</div>}

                            {formErrors.error ? <div className="invalid-feedback">{formErrors.error}</div> : null}
                        </div>
                        <div className="form-group row">
                            <label htmlFor="new_password">New password</label>
                            <input name="new_password"
                                   type="password"
                                   onChange={changeNewPassword}
                                   className='form-control'/>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="confirm_new_password">Confirm new password</label>
                            <input name="confirm_new_password" type="password" onChange={changeConfirmNewPassword}
                                   className={formErrors.newPassword ? 'form-control is-invalid' : 'form-control'}/>
                            {formErrors.newPassword !== null &&
                            <div className='invalid-feedback'>{formErrors.newPassword}</div>}
                        </div>
                        <div className="form-group row">
                            <label htmlFor="about">About: </label>
                            <input name="about"
                                   type="text"
                                   value={user.profile.about}
                                   className="form-control"
                                   onChange={changeAbout}/>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="pic">User Picture:</label>
                            <input type="file" className="form-control-file" id="pic"
                                   aria-describedby="sizeHelp" onChange={changePic}/>
                        </div>
                        <div className="form-group row">
                            <button onClick={saveUser}
                                    className="btn btn-primary btn-block">Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    ) : null
}

export default withRouter(EditUserDetails)