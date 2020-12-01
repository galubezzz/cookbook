import React, {useState, useEffect} from "react";
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import Recipe from "./Recipe";
import {baseUrl} from '../utils'
import UserContext from "../userContext";

function RecipeList(props) {
    const [recipes, setRecipes] = useState([]);
    const url = `${baseUrl}/api/v1/recipes/`;
    let params = props.match.params
    const user = React.useContext(UserContext);
    const token = "user.token";

    // const token = props.user.token;
    useEffect(() => {
        if (user){
            params = {...params, headers: {"Authorization" : `Token ${token}`} }
        }
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
            <div className="recipes-section">
                <div className="container">
                    <div className="section-title">
                        <h3>Latest Recipes</h3>
                    </div>
                    <div className="row">
                        {recipes.length > 0 ? RenderRecipes(recipes) : "you don't have any recipes"}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default withRouter(RecipeList)