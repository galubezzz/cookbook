import React, {useState} from "react";
import {withRouter} from 'react-router-dom'


function SearchBar(props) {
    const [searchString, setSearchString] = useState("")
    const searchUrl = (search) => `/search/${search}`;
    function search(event) {
        event.preventDefault();
        props.history.push(searchUrl(searchString))
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