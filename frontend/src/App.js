import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    NavLink,
} from "react-router-dom";

import RecipeDetails from "./components/RecipeDetails";
import AddRecipe from "./components/AddRecipe";
import RecipeList from "./components/RecipeList";
import EditRecipe from "./components/EditRecipe";
import AddIngredient from "./components/AddIngredient";
import AddStep from "./components/AddStep";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import CheckAuth from "./components/CheckAuth";
function App() {

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" activeClassName="active" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add-recipe" activeClassName="active" className="nav-link">Add
                            Recipe</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/register' activeClassName='active' className='nav-link'>Registration</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/login' activeClassName='active' className='nav-link'>Login</NavLink>
                    </li>
                </ul>
            </nav>
            <Route exact path="/" children={() => (
                <CheckAuth>
                    <RecipeList/>
                </CheckAuth>
            )}/>
            <Route exact path="/recipe/:id" component={RecipeDetails}/>
            <Route exact path="/add-recipe" component={AddRecipe}/>
            <Route exact path="/edit-recipe/:id" component={EditRecipe}/>
            <Route exact path="/add-ingredient/:id" component={AddIngredient}/>
            <Route exact path="/add-step/:id" component={AddStep}/>
            <Route exact path="/register" component={UserRegistration}/>
            <Route exact path="/login" component={UserLogin}/>

        </Router>

    );
}

export default App;
