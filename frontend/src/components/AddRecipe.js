import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import ReactTags from 'react-tag-autocomplete'


function AddRecipe(props) {
    const [recipe, setRecipe] = useState({});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const [fileUploaded, setFileUploaded] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [tags, setTags] = useState([])

    useEffect(() => {
        console.log('--recipe', recipe);
        setTags(
            [
                {name: "Apples"},
                {name: "Pears"}]
        );
        setSuggestions(
            [
                {id: 3, name: "Bananas"},
                {id: 4, name: "Mangos"},
                {id: 5, name: "Lemons"},
                {id: 6, name: "Apricots"}
            ])
    }, []);

    function changeName(event) {
        ;
        setRecipe({
            ...recipe,
            name: event.target.value
        });
    }

    function onDelete(i) {
        const _tags = tags.slice(0);
        _tags.splice(i, 1);
        setTags(_tags)
    }

    function onAddition(tag) {
        console.log(tag)
        const _tags = [].concat(tags, tag);
        setTags(_tags)
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

    function saveRecipe(event) {
        event.preventDefault();
        console.log("bla")
        const url = 'http://127.0.0.1:8000/api/v1/recipes/';
        const data = new FormData();
        if (fileUploaded) {
            data.append('pic', recipe.pic, recipe.pic.name);
        }
        ;
        data.append('name', recipe.name);
        data.append('description', recipe.description);
        const _tags = tags.map((tag) => tag.name);
        data.append('tags', _tags.join(","));
        data.append('user', props.user.username)


        axios.post(url, data)
            .then((response) => {
                console.log('--response', response);
                if (response.status === 201) {
                    setSaved(true);
                    props.history.push(`/recipe/${response.data.id}`)
                } else {
                    setMessage(`was not saved: ${JSON.stringify(response)}`);
                }
            });
    }

    return (
        <>
            <div className="card p-2">
                <div className="card-body">
                    <h3 className="card-title">Create your recipe</h3>

                    {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
                    <p>
                        {message}
                    </p>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-1 col-form-label">Name:</label>
                        <div className="col-sm-8">
                            <input name="name" id="name" className="form-control pr-2" onChange={changeName}/>
                        </div>
                    </div>
                    <br/>
                    <div class="form-group row">
                        <label htmlFor="description" className="col-sm-1 col-form-label">Description:</label>
                        <div className="col-sm-8">
                            <textarea name="description" className="form-control" id="description" aria-multiline="true"
                                      onChange={changeDesc}/>
                        </div>
                    </div>
                    <br/>
                    <div className="form-group row">
                        <label htmlFor="pic" className="col-sm-1 col-form-label">Pic:</label>
                        <div className="col-sm-8">
                            <input name="pic" className="form-control-file" id="pic" type="file" onChange={changeFile}/>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="col-sm-9">
                            <ReactTags
                                tags={tags}

                                suggestions={suggestions}
                                onDelete={onDelete}
                                onAddition={onAddition}
                                allowNew={true}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-9">
                            <button className="btn btn-primary btn-block" onClick={saveRecipe}>Save Recipe</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(AddRecipe);