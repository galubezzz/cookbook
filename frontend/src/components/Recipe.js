import React from 'react';
import {Link} from 'react-router-dom';
import TagsList from "./RecipeDetails/TagsList";

export default function Recipe(props) {
    const {recipe} = props;

    return (
        <div className="col-md-4 col-lg-3 col-sm-6">
            <div className='card m-2'>
                <img className="card-img-top" src={recipe.pic} width='200px'/>
                <div className="card-body">
                    <Link to={`/recipe/${recipe.id}`}>
                        <h5 className="card-title crop-title">{recipe.name}</h5>
                    </Link>
                    <Link to={`/user/${recipe.user_id.username}/`}>
                        @{recipe.user_id.username}
                    </Link>
                    <p className='card-text crop-text text-muted'>{recipe.description}</p>
                    {recipe.tags ? <TagsList tags={recipe.tags}/> : null}
                </div>

            </div>
        </div>


    )
}
