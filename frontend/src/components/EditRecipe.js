import React, {useEffect, useState} from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';



function EditRecipe(props){
    const [recipe, setRecipe] = useState({});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const [fileUploaded, setFileUploaded] = useState(false);

    const recipeURL = (id) => `http://127.0.0.1:8000/api/v1/recipes/${id}/`;
    const id = props.match.params.id;

    useEffect(()=>{
        axios.get(recipeURL(id)).then((response)=>{
            setRecipe(response.data)
        })
    }, []);

    function changeName(event) {
        setRecipe({
            ...recipe,
            name: event.target.value
        });
    }

    function changeDesc(event) {
        setRecipe({
            ...recipe,
            description: event.target.value
        });
    }

    function changeFile(event) {
        setRecipe({
            ...recipe,
            pic: event.target.files[0]
        });
        setFileUploaded(true);
    }
;
    function saveRecipe() {
        const data = new FormData();
        console.log("---recipe pic", recipe.pic);
        if (fileUploaded) {
            data.append('pic', recipe.pic, recipe.pic.name);
        }

        data.append('name', recipe.name);
        data.append('description', recipe.description);

        axios.patch(recipeURL(recipe.id), data)
            .then((response) => {
                console.log('--response', response);
                if (response.status === 200) {
                    setSaved(true);
                    props.history.push(`/recipe/${recipe.id}`)
                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            });
    }
    return(
     <>
            <h1>Edit your recipe</h1>

            {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
            <p>
                {message}
            </p>


            <label htmlFor="name">Name:</label>
            <input name="name" id="name" onChange={changeName} value={recipe.name}/>

            <br/>

            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" aria-multiline="true" onChange={changeDesc} value={recipe.description}/>

            <br/>

            <label htmlFor="pic">Pic:</label>
            <input name="pic" id="pic" type="file" onChange={changeFile}/>

            <br/>
            <button onClick={saveRecipe}> Save Recipe</button>
        </>)
}

export default withRouter(EditRecipe);