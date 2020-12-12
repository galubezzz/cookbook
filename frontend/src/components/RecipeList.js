import React, {useState, useEffect} from "react";
import {withRouter} from 'react-router-dom';
import axios from 'axios'
import Recipe from "./Recipe";
import {baseUrl} from '../utils'
import UserContext from "../userContext";

const CancelToken = axios.CancelToken;


function RecipeList(props) {
    const [recipes, setRecipes] = useState([]);
    const [updateSwitch, setUpdateSwitch] = useState(false)
    const [nextLink, setNextLink] = useState('')
    const url = `${baseUrl}/api/v1/recipes/`;
    let params = props.match.params;
    const user = React.useContext(UserContext);
    let config = {};
    const [heading, setHeading] = useState("Latest recipes");


    function updateTrigger() {
        setUpdateSwitch(!updateSwitch);
    }

    useEffect(() => {
        if (props.location.pathname === '/favorites/') {
            params = {favorite: true};
            setHeading("Favorites");
        } else if (user && props.location.pathname === `/my-recipes/`) {
            setHeading("My recipes");
            params = {username:user.username};
        } else if (params.username) {
            setHeading(`${params.username} recipes`)
        }
    }, [updateSwitch])

    function setLink(link){
        if (link) {
                setNextLink(link)
            } else {
                setNextLink('')
            }
    }

    useEffect(() => {
        const source = CancelToken.source();
        if (user) {
            config = {params: params, cancelToken: source.token, headers: {"Authorization": `Token ${user.token}`}}
        }
        console.log('we got here somehow');
        axios.get(url, config).then((response) => {
            setRecipes(response.data.results);
            setLink(response.data.next)
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message);
            } else {
                // handle error
            }
        });
        return () => {
            source.cancel('Operation canceled by the user.');
        }
    }, [updateSwitch]);


    function loadMoreRecipes() {
        axios.get(nextLink, config).then((response) => {
            const _recipes = [].concat(recipes, response.data.results);
            setRecipes(_recipes);
            setLink(response.data.next)
        })
    }

    function RenderRecipes(recipes) {
        return recipes.map((recipe) => {
            return <Recipe recipe={recipe} key={recipe.id} update={updateTrigger}/>
        })
    }

    return (
        <div id="main" className="col-12">
            <div className="recipes-section">
                <div className="container">
                    <div className="section-title">
                        <h3>{heading}</h3>
                    </div>
                    <div className="row">
                        {recipes.length > 0 ? RenderRecipes(recipes) : "you don't have any recipes"}
                    </div>
                    {nextLink ? <div onClick={loadMoreRecipes}>Load more recipes</div> : null}
                </div>
            </div>

        </div>
    )
}

export default withRouter(RecipeList)