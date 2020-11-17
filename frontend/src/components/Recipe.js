import React from 'react';
import {Link} from 'react-router-dom';

export default function Recipe(props) {
    const {recipe} = props;

    return (
        <div class='card m-2'>
            <img className="card-img-top" src={recipe.pic} width='200px'/>
            <Link to={`/recipe/${recipe.id}`} style={{border: '1px solid #ccc'}}>
                <h5 class="card-title">{recipe.name}</h5>
            </Link>
            <p class='card-text'>{recipe.description}</p>
        </div>

    )
}
