import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import DjangoCSRFToken from 'django-react-csrftoken'

export default function AddRecipe() {
    const [recipe, setRecipe] = useState({});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log('--recipe', recipe);
    });

    function changeName(event) {
        console.log('--- change name event', event.target.value);
        setRecipe({
            ...recipe,
            name: event.target.value
        });
    }

    function changeDesc(event) {
        console.log('--- change desc event', event.target.value);
        setRecipe({
            ...recipe,
            description: event.target.value
        });
    }

    function changeFile(event) {
        console.log('--file event', event.target.files[0]);

        setRecipe({
            ...recipe,
            pic: event.target.files[0]
        })
    }

    function saveRecipe() {
        const url = 'http://127.0.0.1:8000/api/v1/recipes/';
        const data = new FormData();
        data.append('pic', recipe.pic, recipe.pic.name);
        data.append('name', recipe.name);
        data.append('description', recipe.description);

        axios.post(url, data)
            .then((response) => {
                console.log('--response', response);
                if (response.status === 201) {
                    setSaved(true);
                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            });
    }

    return (
        <>
            <h1>Create your recipe</h1>

            {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
            <p>
                {message}
            </p>

            {/*<form action="http://127.0.0.1:8000/api/v1/recipes/" method="post" enctype="multipart/form-data">*/}

            <label htmlFor="name">Name:</label>
            <input name="name" id="name" onChange={changeName}/>

            <br/>

            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" aria-multiline="true" onChange={changeDesc}/>

            <br/>

            <label htmlFor="pic">Pic:</label>
            <input name="pic" id="pic" type="file" onChange={changeFile}/>

            <br/>
            <button onClick={saveRecipe}> Save Recipe</button>
            {/*</form>*/}
        </>
    )
}