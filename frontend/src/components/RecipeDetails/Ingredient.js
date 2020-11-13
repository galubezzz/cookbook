import React from "react";

export default function Ingredient(props) {
    const {ingredient} = props;
    return (
        <>
            <h3>{ingredient.name}</h3>
            <div>{ingredient.quantity}</div>
            <div>{ingredient.unit}</div>
        </>
    )

}
