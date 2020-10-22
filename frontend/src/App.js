import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import Recipe from './components/Recipe';
import RecipeDetails from "./components/RecipeDetails";

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
            <Route exact path="/">
                <div className="App">
                    {recipes.length > 0 ? renderAllRecipes(recipes) : "you don't have any recipes yet"}
                </div>
            </Route>
            <Route exact path="/recipe/:id" component={RecipeDetails}/>
        </Router>

    );
}

export default App;
