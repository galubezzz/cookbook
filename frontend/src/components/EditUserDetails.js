import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom';

function EditUserDetails(props) {
    const url = `http://127.0.0.1:8000/api/v1/users/`;
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

    function saveUser(event) {
        event.preventDefault();
        if (!user.password && user.newPassword) {
            console.log("we are here!");
            setFormErrors({
                ...formErrors,
                password: "This field cannot be empty",
            });
            return
        }
        const formIsValid = (!formErrors.email && !formErrors.newPassword)
        if (formIsValid) {
            axios.patch(url, user, {headers: {"Authorization": `Token ${token}`}}).then((response) => {
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
            <h3>Edit user information:</h3>
            <form>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-1 col-form-label">Username</label>
                    <div className="col-sm-8">
                        <input name="username"
                               type="text"
                               value={user.username}
                               disabled
                               className="form-control pr-2"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-1 col-form-label">Email</label>
                    <div className="col-sm-8">
                        <input name="email"
                               type="text"
                               value={user.email}
                               onChange={changeEmail}
                               className={formErrors.email ? 'form-control pr-2 is-invalid' : 'form-control pr-2'}/>
                        {formErrors.email !== null &&
                        <div className='invalid-feedback'>{formErrors.email}</div>}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-1 col-form-label">Old password</label>
                    <div className="col-sm-8">
                        <input name="password"
                               type="password"
                               onChange={changePassword}
                               className={formErrors.password || formErrors.error ? 'form-control pr-2 is-invalid' : 'form-control pr-2'}/>
                        {formErrors.password !== null &&
                        <div className='invalid-feedback'>{formErrors.password}</div>}

                    {formErrors.error ? <div className="invalid-feedback">{formErrors.error}</div> : null}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="new_password" className="col-sm-1 col-form-label">New password</label>
                    <div className="col-sm-8">
                        <input name="new_password"
                               type="password"
                               onChange={changeNewPassword}
                               className='form-control pr-2'/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="confirm_new_password" className="col-sm-1 col-form-label">Confirm new
                        password</label>
                    <div className="col-sm-8">
                        <input name="confirm_new_password" type="password" onChange={changeConfirmNewPassword}
                               className={formErrors.newPassword ? 'form-control pr-2 is-invalid' : 'form-control pr-2'}/>
                        {formErrors.newPassword !== null &&
                        <div className='invalid-feedback'>{formErrors.newPassword}</div>}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-9">
                        <button onClick={saveUser}
                                className="btn btn-primary btn-block">Save
                        </button>
                    </div>
                </div>
            </form>
        </>
    ) : null
}

export default withRouter(EditUserDetails)