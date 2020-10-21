import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Recipe from './components/Recipe';

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

    return (
        <div className="App">
            {recipes.map((recipe) => {
                return (
                    <Recipe key={recipe.id} recipe={recipe}/>
                );
            })}
        </div>
    );
}

export default App;
