import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import DjangoCSRFToken from 'django-react-csrftoken'

function AddRecipe(props) {
    const [recipe, setRecipe] = useState({});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const [fileUploaded, setFileUploaded] = useState(false);

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
        });
        setFileUploaded(true);
    }

    function saveRecipe() {
        const url = 'http://127.0.0.1:8000/api/v1/recipes/';
        const data = new FormData();
        if (fileUploaded) {
            data.append('pic', recipe.pic, recipe.pic.name);
        };
        data.append('name', recipe.name);
        data.append('description', recipe.description);

        axios.post(url, data)
            .then((response) => {
                console.log('--response', response);
                if (response.status === 201) {
                    setSaved(true);
                    props.history.push(`/add-ingredient/${recipe.id}`)
                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            });
    }

    return (
        <>
            <div class="card p-2">
                <div class="card-body">
                    <h3 class="card-title">Create your recipe</h3>

                    {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
                    <p>
                        {message}
                    </p>
                        <div class="form-group row">
                            <label htmlFor="name" class="col-sm-1 col-form-label">Name:</label>
                            <div class="col-sm-8">
                                <input name="name" id="name" class="form-control pr-2" onChange={changeName}/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label htmlFor="description" class="col-sm-1 col-form-label">Description:</label>
                            <div className="col-sm-8">
                            <textarea name="description" class="form-control" id="description" aria-multiline="true" onChange={changeDesc}/>
                             </div>
                            </div>
                        <br/>
                        <div className="form-group row">
                            <label htmlFor="pic" class="col-sm-1 col-form-label">Pic:</label>
                            <div className="col-sm-8">
                            <input name="pic" class="form-control-file" id="pic" type="file" onChange={changeFile}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-9">
                                <button class="btn btn-primary btn-block" onClick={saveRecipe}> Save Recipe</button>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(AddRecipe);