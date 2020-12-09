import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TagsList from "./RecipeDetails/TagsList";
import {baseUrl} from '../utils'
import UserContext from "../userContext";
import {withRouter, Link} from "react-router-dom";

function Recipe(props) {
    const [recipe, setRecipe] = useState(props.recipe);
    const user = React.useContext(UserContext);
    const favUrl = (id) => `${baseUrl}/api/v1/favorites/${id}`;
    let config = {};
    useEffect(()=>{
            setRecipe(props.recipe);
    }, []);
    if (user) {
        config = { headers: {"Authorization" : `Token ${user.token}`} }
    }
    function FavRecipe(){

            axios.post(favUrl(recipe.id), [], config).then((response)=>{
                if (response.status === 201){
                    setRecipe({...recipe, favorite: true});
                }
            })

    }

    function UnFavRecipe(){
        axios.delete(favUrl(recipe.id), config).then((response)=>{
                if (response.status === 204){
                    setRecipe({...recipe, favorite: false})
                    if (props.location.pathname === '/favorites/') {
                    props.update();
                }
                }
            })
    }

    return (recipe ? <>
        <div className="col-6 col-md-3">
            <div className="recipe-thumb">
                <img src={recipe.pic} alt="Recipe Image" className="recipe-image"/>
                {recipe.favorite ?
                    <Link href="#" className="bookmarker" style={{background: "#232323"}} onClick={UnFavRecipe}><i className="fas fa-bookmark"></i></Link> :
                    <Link href="#" className="bookmarker" style={{background: "#e33d26"}} onClick={FavRecipe}><i className="fas fa-bookmark"></i></Link>}
                    <Link to={`/recipe/${recipe.id}`} className="view-recipe">VIEW RECIPE</Link>
            </div>
            <div className="recipe-desc">
                <h2 className="recipe-title">
                    <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                </h2>
                <p><em>
                    <Link to={`/user/${recipe.user_id.username}`}>
                        By {recipe.user_id.username}
                    </Link>
                    </em></p>
                <span>{recipe.tags ? <TagsList tags={recipe.tags}/> : null}</span>
            </div>
        </div>
</> : null
    )
}

export default withRouter(Recipe)