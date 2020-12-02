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
        <div className="container searchbardiv" id="formsearch" >
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