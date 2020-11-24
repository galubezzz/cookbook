import React, {useState} from "react";
import axios from "axios";
import {withRouter} from 'react-router-dom'


function SearchBar(props) {
    const [searchString, setSearchString] = useState("")
    const url = "http://127.0.0.1:8000/api/v1/recipes";
    const params = {};
    const searchUrl = (search) => `/search/${search}`;
    function search(event) {
        event.preventDefault();
        props.history.push(searchUrl(searchString))
        // axios.get(url, {params}).then((response)=>{
        //     console.log("---resonse", response);
        // })
    }
    function onSearchChange(event) {
        setSearchString(event.target.value)
    }

    return (
        <form className="form-inline" onSubmit={search}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                   aria-label="Search" onChange={onSearchChange}/>
            <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit" >Search
            </button>
        </form>
    )
}
export default withRouter(SearchBar)