import React, {useState} from 'react';
import IngredientViewSwitch from "./IngredientViewSwitch";
import AddIngredient from "../AddIngredient";

export default function IngredientsList(props) {
    const {isEditable, recipe_id} = props;
    const [ingredients, setIngredients] = useState(props.ingredients);
    const [addIngMode, setAddIngMode] = useState(false);
    const renderIngredient = (ingredient) => <IngredientViewSwitch isEditable={isEditable} ingredient={ingredient}/>
    function addIngredient() {
        setAddIngMode(true);
    }
    function saveIngredient(new_ingredient) {
        setAddIngMode(false);
        setIngredients([...ingredients, new_ingredient]);
    }
    return (
        <>
            <h4>INGREDIENTS: {isEditable ? <a href="#"><i className="fas fa-plus icon" onClick={addIngredient}></i></a> : null}</h4>
            {addIngMode ? <AddIngredient id={recipe_id} onSave={saveIngredient} /> : null}
            <ul>
            {ingredients.map(renderIngredient)}
            </ul>
        </>
    );
}