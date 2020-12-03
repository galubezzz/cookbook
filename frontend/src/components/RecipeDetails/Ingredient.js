import React, {useState} from "react";
import axios from "axios"
import ConfirmDelete from "./ConfirmDelete";
import {baseUrl} from '../../utils';
import {Link} from "react-router-dom";

export default function Ingredient(props) {
    const {ingredient, onEdit, isEditable} = props;
    const deleteUrl = (id) => `${baseUrl}/api/v1/ingredients/${id}/`;
    const [show, setShow] = useState(false);

    function onAgreeToDelete() {
        console.log('agree to delete')
        setShow(false);
        axios.delete(deleteUrl(ingredient.id)).then((response) => {
            if (response.status === 204) {
                props.onDelete()
            }
        })
    }

    function onDisagree() {
        setShow(false);
    }

    function onDelete() {
        setShow(true);
    }

    return (
        <>
            <li>
                <div>{ingredient.name} {ingredient.quantity}{ingredient.unit}
                    {isEditable ? <>
                        <Link to="#"><i className="fas fa-pen icon" onClick={onEdit}></i></Link>
                        <div style={{position: "relative"}} className="icon-div">
                            <Link to="#"><i className="fas fa-trash-alt icon" onClick={onDelete}></i></Link>
                            <ConfirmDelete onAgree={onAgreeToDelete} show={show} onDisagree={onDisagree}
                                           itemType={"ingredient"}
                            />
                        </div>
                    </> : null}
                </div>
            </li>
        </>
    )
}
