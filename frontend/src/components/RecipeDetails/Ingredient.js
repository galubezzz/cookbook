import React, {useState} from "react";
import axios from "axios"
import ConfirmDelete from "./ConfirmDelete";

export default function Ingredient(props) {
    const {ingredient, onEdit, isEditable} = props;
    const deleteUrl = (id) => `http://127.0.0.1:8000/api/v1/ingredients/${id}/`

    function onDelete() {
        let confirmation = window.confirm("Are you sure you want delete this ingredient?")
        if (confirmation) {
            axios.delete(deleteUrl(ingredient.id)).then((response) => {
                if (response.status === 204) {
                    console.log("Deleted succesfully");
                    props.onDelete()
                }
            })
        }
    }

    // function drawDelete(){
    //     setDeleteMode(true);
    // }
    return (
        <>
            <li className="list-group-item">
                <div>{ingredient.name} {ingredient.quantity}{ingredient.unit}
                    {isEditable ? <>
                        <i className="fas fa-pen icon" onClick={onEdit}></i>
                        <i className="fas fa-trash-alt icon" onClick={onDelete}></i>
                        {/*{deleteMode ? <ConfirmDelete onDelete={onDelete}/> : null}*/}
                    </> : null}
                </div>
            </li>
        </>
    )

}
