import React from 'react';
import {Link} from 'react-router-dom';
import TagsList from "./RecipeDetails/TagsList";

export default function Recipe(props) {
    const {recipe} = props;

    return (<>
        <div className="col-6 col-md-3">
            <div className="recipe-thumb">
                <img src={recipe.pic} alt="Recipe Image" className="recipe-image"/>
                    <a href="#" className="bookmarker"><i className="fas fa-bookmark"></i></a>
                    <a href={`/recipe/${recipe.id}`} className="view-recipe">VIEW RECIPE</a>
            </div>
            <div className="recipe-desc">
                <h2 className="recipe-title">
                    <a href={`/recipe/${recipe.id}`}>{recipe.name}</a>
                </h2>
                <p><em>By {recipe.user_id.username}</em></p>
                <span>{recipe.tags ? <TagsList tags={recipe.tags}/> : null}</span>
            </div>
        </div>
</>

    )
}
