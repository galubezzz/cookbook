import React, {useContext} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    useHistory
} from "react-router-dom";

import RecipeDetails from "./components/RecipeDetails";
import AddRecipe from "./components/AddRecipe";
import RecipeList from "./components/RecipeList";
import EditRecipe from "./components/EditRecipe";
import AddIngredient from "./components/AddIngredient";
import AddStep from "./components/AddStep";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import UserAccount from "./components/UserAccount";
import EditUserDetails from "./components/EditUserDetails";
import UserContext from './userContext';
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const initialState = {
    user: null,
};



if (localStorage.getItem('token')) {
    initialState.user = {}
    initialState.user.token = localStorage.getItem('token');
    initialState.user.username = localStorage.getItem('username');
    initialState.user.id = +localStorage.getItem('id');
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {user: action.payload};
        case 'logout':
            return {user: null};
    }
};

function logout(dispatch) {

        dispatch({type: 'logout'});
        localStorage.clear();

    }

function App() {


    const [state, dispatch] = React.useReducer(reducer, initialState);

    const isLoggedIn = state.user && state.user.token;

    return (
        <UserContext.Provider value={state.user}>
            <div id="page">
                <Router>
                    <Navigation isLoggedIn={isLoggedIn} state={state} logout={() => logout(dispatch)}/>


                    <Route exact path="/">
                        {/*{isLoggedIn ? <RecipeList user={state.user}/> : 'Please login to see your recipes'}*/}
                        <RecipeList/>
                    </Route>
                    <Route exact path="/recipe/:id">
                        <RecipeDetails/>
                    </Route>

                    <Route exact path="/add-recipe">
                        {isLoggedIn ? <AddRecipe user={state.user}/> : <h1>Please log in to add a new recipe</h1>}
                    </Route>
                    <Route exact path="/edit-recipe/:id">
                        {isLoggedIn ? <EditRecipe user={state.user}/> : 'You are not logged in'}
                    </Route>
                    <Route exact path="/search/:search" component={RecipeList}></Route>
                    <Route exact path="/tag/:tag" component={RecipeList}></Route>
                    <Route exact path="/user/:username">
                        <UserAccount user={state.user}/>
                    </Route>
                    <Route exact path="/favorites/" component={RecipeList}></Route>
                    <Route exact path="/add-ingredient/:id" component={AddIngredient}/>
                    <Route exact path="/add-step/:id" component={AddStep}/>
                    <Route exact path="/register" component={UserRegistration}/>
                    <Route exact path="/edit-user-details">
                        {isLoggedIn ? <EditUserDetails user={state.user}/> : 'You are not logged in'}
                    </Route>
                    <Route exact path="/my-account/">
                        {isLoggedIn ? <UserAccount user={state.user}/> : 'You are not logged in'}
                    </Route>
                    <Route exact path="/login">
                        <UserLogin onLogin={(user) => dispatch({type: 'login', payload: user})}/>
                    </Route>
                </Router>

            </div>
            <Footer/>
        </UserContext.Provider>
    );
}

export default App;
