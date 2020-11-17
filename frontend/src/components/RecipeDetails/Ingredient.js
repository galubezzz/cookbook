import React from "react";

export default function Ingredient(props) {
    const {ingredient, onEdit, isEditable} = props;
    return (
        <>
            <h3>{ingredient.name}</h3>
            <div>{ingredient.quantity}</div>
            <div>{ingredient.unit}</div>
            {isEditable ? <button onClick={onEdit}>Edit Ingredient</button> : null}
        </>
    )

}
