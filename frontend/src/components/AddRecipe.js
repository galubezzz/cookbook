import React from 'react';
import axios from 'axios';
// import DjangoCSRFToken from 'django-react-csrftoken'

export default function AddRecipe() {
    return (
        <>
            <h1>Create your recipe</h1>

            <form action="http://127.0.0.1:8000/api/v1/recipes/" method="post" enctype="multipart/form-data">

                {/*<DjangoCSRFToken/>*/}

                <label htmlFor="name">Name:</label>
                <input name="name" id="name"/>

                <br/>

                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description" aria-multiline="true"/>

                <br/>

                <label htmlFor="pic">Pic:</label>
                <input name="pic" id="pic" type="file"/>

                <br/>
                <input type="submit"/>
            </form>
        </>
    )
}