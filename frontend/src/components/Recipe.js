import React from 'react';

export default function Recipe(props) {
    const {recipe} = props;

    return (
        <div style={{border: '1px solid #ccc'}}>
            <div>{recipe.id}</div>
            <div>{recipe.name}</div>
            <div>{recipe.description}</div>
            <img src={recipe.pic} width='200px' />
        </div>
    )
}
