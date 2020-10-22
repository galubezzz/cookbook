import React from 'react';
import { Link } from 'react-router-dom';

export default function Recipe(props) {
    const {recipe} = props;

    return (
        <Link to={`/recipe/${recipe.id}`} style={{border: '1px solid #ccc'}}>
            <div>{recipe.name}</div>
            <img src={recipe.pic} width='200px' />
        </Link>
    )
}
