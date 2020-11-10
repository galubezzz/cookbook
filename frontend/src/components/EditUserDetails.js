import React, {useEffect, useState} from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';

function EditUserDetails(props){
    const url = `http://127.0.0.1:8000/api/v1/users/`;
    const [user, setUser] = useState();
    const token = props.user.token;
    function changeUserName(event) {
        setUser({
            ...user,
            username: event.target.value
        });
    }
    function changeEmail(event) {
        setUser({
            ...user,
            email: event.target.value
        });
    }
    function saveUser(event){
        event.preventDefault();
        axios.patch(url, user, {headers: {"Authorization": `Token ${token}`}}).then((response)=>{
            if (response.status === 200){
                props.history.push("/my-account")
            }
            else
            {
                console.log(response)
            }
            }

        )
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
                <label htmlFor="username">Username</label>
                <input name="username" type="text" value={user.username} onChange={changeUserName}/>
                <label htmlFor="email">Email</label>
                <input name="email" type="text" value={user.email} onChange={changeEmail}/>
                 <button onClick={saveUser}>Save</button>
            </form>
        </>
    ) : null
}

export default withRouter(EditUserDetails)