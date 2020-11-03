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
    function saveRecipe(event) {
        event.preventDefault();
        const data = new FormData();
        if (fileUploaded) {
            data.append('pic', recipe.pic, recipe.pic.name);
        }

        data.append('name', recipe.name);
        data.append('description', recipe.description);

        axios.patch(recipeURL(recipe.id), data)
            .then((response) => {
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
            <div className="card p-2">
                <div className="card-body">
                    <h3 className="card-title">Create your recipe</h3>
                    {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
                    <p>
                        {message}
                    </p>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-1 col-form-label">Name:</label>
                            <div className="col-sm-8">
                                <input name="name" id="name" className="form-control pr-2" onChange={changeName}
                                       value={recipe.name}/>
                            </div>
                        </div>
                        <br/>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-1 col-form-label">Description:</label>
                            <div className="col-sm-8">
                             <textarea name="description" className="form-control" id="description"
                                       aria-multiline="true" onChange={changeDesc} value={recipe.description}/>
                            </div>
                        </div>
                        <br/>
                        <div className="form-group row">
                            <label htmlFor="pic" className="col-sm-1 col-form-label">Pic:</label>
                            <div className="col-sm-8">
                                <input name="pic" className="form-control-file" id="pic" type="file"
                                       onChange={changeFile}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-9">
                                <button className="btn btn-primary btn-block" onClick={saveRecipe}> Save Recipe</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}

export default withRouter(EditRecipe);