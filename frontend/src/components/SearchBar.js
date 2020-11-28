import React, {useState} from "react";
import {withRouter} from 'react-router-dom'


function SearchBar(props) {
    const [searchString, setSearchString] = useState("")
    const url = "http://127.0.0.1:8000/api/v1/recipes";
    const params = {};
    const searchUrl = (search) => `/search/${search}`;

    function search(event) {
        event.preventDefault();
        props.history.push(searchUrl(searchString))
    }

    function onSearchChange(event) {
        setSearchString(event.target.value)
    }

    return (
        <div className="container searchbardiv" id="formsearch" style={{display:"none"}}>
            <form role="search" method="get" id="searchform" onSubmit={search}>
                <div className="input-group">
                    <input type="text" id="searchbox" className="form-control" name="s" onChange={onSearchChange}/>
                    <div className="input-group-btn">
                        <button className="btn btn-search" id="searchsubmit" type="submit">
                            <strong>Search</strong>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default withRouter(SearchBar)