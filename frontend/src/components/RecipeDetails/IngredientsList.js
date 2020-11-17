import React from 'react';
import IngredientViewSwitch from "./IngredientViewSwitch";

export default function IngredientsList(props) {
    const {ingredients, isEditable} = props;

    const renderIngredient = (ingredient) => <IngredientViewSwitch isEditable={isEditable} ingredient={ingredient}/>

    return (
        <>
            <h4>Ingredients:</h4>
            <ul className="list-group list-group-flush">
            {ingredients.map(renderIngredient)}
            </ul>
        </>
    );
}