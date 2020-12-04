import React, {useState} from "react";
import TagsList from "./RecipeDetails/TagsList";

export default function RecipeThumb(props) {
    const [recipe, setRecipe] = useState(props.recipe);
    return ( recipe ?
        <div className="col-4">
            <div className="recipe-thumb">
                <img src={recipe.pic} alt="Recipe Image"/>

                <a href={`/recipe/${recipe.id}`} className="view-recipe">VIEW RECIPE</a>
            </div>
            <div className="recipe-desc">
                <h2 className="recipe-title">
                    <a href={`/recipe/${recipe.id}`}>{recipe.name}</a>
                </h2>
                <p><em>By {recipe.user_id.username}</em></p>
                <span>{recipe.tags ? <TagsList tags={recipe.tags}/> : null}</span>
            </div>
        </div> : null
    )
}