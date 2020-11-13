import React from 'react';
import EditIngredient from "./EditIngredient";
import Ingredient from "./Ingredient";
import RecipeIngredientViewSwitch from "./IngredientViewSwitch";

export default function IngredientsList(props) {
    const {ingredients, isEditable, onSave} = props;

    const renderIngredient = (ingredient) => <RecipeIngredientViewSwitch isEditable={isEditable} ingredient={ingredient} onSave={onSave}/>

    return (
        <>
            <h2>Ingredients:</h2>
            {ingredients.map(renderIngredient)}
        </>
    );
}