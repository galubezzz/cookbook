import React, {useState, useEffect} from "react";
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import Recipe from "./Recipe";
import {baseUrl} from '../utils'

function RecipeList(props) {
    const [recipes, setRecipes] = useState([]);
    const url = `${baseUrl}/api/v1/recipes/`;
    const params = props.match.params;

    // const token = props.user.token;
    useEffect(() => {
        axios.get(url, {params}).then((response) => {
            console.log("it's mine", response.data);
            setRecipes(response.data);
        })
    }, [params]);

    function RenderRecipes(recipes) {
        return recipes.map((recipe) => {
            return <Recipe recipe={recipe} key={recipe.id}/>
        })
    }

    return (
        <div id="main" className="col-12">
            <div className="container">
                <div className="row">
                    {recipes.length > 0 ? RenderRecipes(recipes) : "you don't have any recipes"}
                </div>
            </div>
        </div>
    )
}

export default withRouter(RecipeList)