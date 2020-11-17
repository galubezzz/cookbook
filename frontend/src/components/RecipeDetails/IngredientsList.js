import React from 'react';
import IngredientViewSwitch from "./IngredientViewSwitch";

export default function IngredientsList(props) {
    const {ingredients, isEditable, onSave} = props;

    const renderIngredient = (ingredient) => <IngredientViewSwitch isEditable={isEditable} ingredient={ingredient} onSave={onSave}/>

    return (
        <>
            <h2>Ingredients:</h2>
            {ingredients.map(renderIngredient)}
        </>
    );
}