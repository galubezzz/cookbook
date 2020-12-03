import React, {useState} from 'react';
import IngredientViewSwitch from "./IngredientViewSwitch";
import AddIngredient from "../AddIngredient";
import {Link} from "react-router-dom";

export default function IngredientsList(props) {
    const {isEditable, recipe_id} = props;
    const [ingredients, setIngredients] = useState(props.ingredients);
    const [addIngMode, setAddIngMode] = useState(false);
    const renderIngredient = (ingredient) => <IngredientViewSwitch key={ingredient.id}
                                                                   isEditable={isEditable} ingredient={ingredient}/>
    function addIngredient() {
        setAddIngMode(true);
    }
    const onCancel = () => {
        setAddIngMode(false);
    }

    function saveIngredient(new_ingredient) {
        setAddIngMode(false);
        setIngredients([...ingredients, new_ingredient]);
    }
    return (
        <>
            <h4>INGREDIENTS: {isEditable ? <Link to="#"><i className="fas fa-plus icon" onClick={addIngredient}></i></Link> : null}</h4>
            {addIngMode ? <AddIngredient id={recipe_id} onSave={saveIngredient} onCancel={onCancel} /> : null}
            <ul>
            {ingredients.map(renderIngredient)}
            </ul>
        </>
    );
}