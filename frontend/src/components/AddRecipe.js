import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import ReactTags from 'react-tag-autocomplete';
import {baseUrl} from '../utils'


function AddRecipe(props) {
    const [recipe, setRecipe] = useState({});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    const [fileUploaded, setFileUploaded] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [tags, setTags] = useState([])
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        setTags(
            []
        );
    }, []);

    function changeName(event) {
        setRecipe({
            ...recipe,
            name: event.target.value
        });
        if (event.target.value.length === 0) {
            setFormErrors({
                ...formErrors,
                name: "Name cannot be empty",
            })
        } else {
            setFormErrors({
                ...formErrors,
                name: null,
            })
        }
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
        if (!recipe.name) {
            setFormErrors({
                ...formErrors,
                name: "Name cannot be empty",
            });
            return;
        }
        const url = `${baseUrl}/api/v1/recipes/`;
        const data = new FormData();
        if (fileUploaded) {
            data.append('pic', recipe.pic, recipe.pic.name);
        }
        ;
        data.append('name', recipe.name);
        if (recipe.description) {
            data.append('description', recipe.description);
        }
        const _tags = tags.map((tag) => tag.name);
        data.append('tags', _tags.join(","));
        data.append('user', props.user.username)


        axios.post(url, data)
            .then((response) => {
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
            <div className="head-title">
                <div className="container">
                    <h2 className="page-title">Submit Your Recipe</h2>
                </div>
            </div>
            <div id="main">
                <div className="container">
                    <form onSubmit={saveRecipe}>
                        <div className="row">
                            <div className="col form-group">
                                <label htmlFor="InputRecipeTitle">Recipe Title</label>
                                <input type="text"
                                       className={formErrors.name ? "form-control is-invalid" : "form-control"}
                                       id="InputRecipeTitle"
                                       aria-describedby="titleHelp"
                                       placeholder="ex. Traditional Fried Rice"
                                       onChange={changeName}/>
                                {formErrors.name ?
                                    <div className='invalid-feedback'>{formErrors.name}</div>
                                    :
                                    <small id="titleHelp" className="form-text text-muted">Keep it short and
                                        descriptive</small>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 form-group">
                                <label htmlFor="recipeImage">Recipe Photo</label>
                                <input type="file" className="form-control-file" id="recipeImage"
                                       aria-describedby="sizeHelp" onChange={changeFile}/>
                                <small id="sizeHelp" className="form-text text-muted">Recommended size: 1440px by 800px
                                    or
                                    larger</small>
                            </div>
                            <div className="col-12 col-md-6 form-group">
                                <label htmlFor="recipeTime">Cooking time</label>
                                <input type="number" min="1" step="1" className="form-control" id="recipeTime"
                                       aria-describedby="timeHelp"/>
                                <small id="timeHelp" className="form-text text-muted">Specify cooking time in
                                    minutes</small>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col form-group">
                                <label htmlFor="descTextarea">Short Description</label>
                                <textarea className="form-control" id="descTextarea" rows="6" onChange={changeDesc}></textarea>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col form-group">
                                <ReactTags
                                    tags={tags}
                                    aria-describedby="tagHelp"
                                    suggestions={suggestions}
                                    onDelete={onDelete}
                                    onAddition={onAddition}
                                    allowNew={true}
                                />
                                <small id="tagHelp" className="form-text text-muted">Write down tag and press
                                    Enter</small>
                                <button type="submit" className="btn btn-primary">Save Recipe</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default withRouter(AddRecipe);