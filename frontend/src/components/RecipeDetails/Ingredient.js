import React from "react";

export default function Ingredient(props) {
    const {ingredient, onEdit, isEditable} = props;
    return (
        <>
            <li className="list-group-item">
                <div>{ingredient.name} {ingredient.quantity}{ingredient.unit}
                    {isEditable ? <i className="fas fa-pen icon" onClick={onEdit}></i> : null}
                </div>
            </li>
        </>
    )

}
