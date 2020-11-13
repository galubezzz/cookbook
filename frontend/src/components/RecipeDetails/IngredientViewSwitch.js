import React, {useState} from 'react';
import EditIngredient from "./EditIngredient";
import Ingredient from "./Ingredient";

export default function IngredientViewSwitch(props) {
    const [isEditMode, setEditMode] = useState(false);
    const {isEditable, ingredient} = props;
    const showEditForm = isEditable && isEditMode;
    const [ingredientFromState, setIngredient] = useState(ingredient);

    const onEditButtonClick = () => {
        setEditMode(true);
    };
    const onIngredientSave = (updatedIngredient) => {
        setEditMode(false);
        setIngredient(updatedIngredient);
    };

    if (showEditForm) {
        return <EditIngredient id={ingredient.id} onSave={onIngredientSave}/>
    } else {
        return <Ingredient ingredient={ingredientFromState} onEdit={onEditButtonClick} isEditable={isEditable}/>
    }
}