import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
} from "react-router-dom";

import Recipe from './components/Recipe';
import RecipeDetails from "./components/RecipeDetails";
import AddRecipe from "./components/AddRecipe";

const recipesURL = 'http://127.0.0.1:8000/api/v1/recipes/';
const tagsURL = 'http://127.0.0.1:8000/api/v1/tags/';

function App() {
    // const stateArr = useState([]);
    // const recipes = stateArr[0];
    // const setRecipe = stateArr[1];
    const [recipes, setRecipe] = useState([]);

    useEffect(() => {
        axios.get(recipesURL)
            .then(function (response) {
                setRecipe(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    function renderAllRecipes(recipes) {
        return recipes.map((recipe) => {
            return (
                <Recipe key={recipe.id} recipe={recipe}/>
            );
        })
    }

    return (
        <Router>
            <NavLink to="/" activeClassName="navLinkActive" className="navLink">Home</NavLink>
            <NavLink to="/add-recipe" activeClassName="navLinkActive" className="navLink">Add Recipe</NavLink>

            <Route exact path="/">
                <div className="recipesList">
                    {recipes.length > 0 ? renderAllRecipes(recipes) : "you don't have any recipes yet"}
                </div>
            </Route>
            <Route exact path="/recipe/:id" component={RecipeDetails}/>
            <Route exact path="/add-recipe" component={AddRecipe}/>
        </Router>

    );
}

export default App;

//
// function getCookie(name) {
//     const cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = jQuery.trim(cookies[i]);
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
//
// const csrftoken = getCookie('csrftoken');
//
// const CSRFToken = () => {
//     return (
//         <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken}/>
//     );
// };
//
// export {
//     CSRFToken
// };
