import React, {useEffect, useState} from 'react';
import axios from "axios";
import Select from "react-select";
import {baseUrl} from "../../../utils"
import {withRouter} from "react-router-dom";

function IngredientForm(props) {
    const {onSave} = props;
    const unitUrl = `${baseUrl}/api/v1/units/`;
    const id = props.match.params.id;

    const [ingredient, setIngredient] = useState({recipe: id});
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectValue, setSelectValue] = useState([]);

    useEffect(() => {
        if (props.ingredient) {
            setIngredient(props.ingredient);
            setSelectValue({
                label: props.ingredient.unit,
                value: props.ingredient.unit
            });
        }
    }, [props.ingredient])

    useEffect(() => {
        axios.get(unitUrl).then((response) => {
            for (let unit in response.data) {
                setSelectOptions(selectOptions => selectOptions.concat({value: response.data[unit], label: unit}))
            }
        });
    }, []);


    function changeName(event) {
        setIngredient({
            ...ingredient,
            name: event.target.value,
        })
    }

    function changeQuantity(event) {
        setIngredient({
            ...ingredient,
            quantity: event.target.value
        })
    }

    function changeUnit(selectedOption) {
        setIngredient({
            ...ingredient,
            unit: selectedOption.label
        });
        setSelectValue(selectedOption);
    }

    function saveIngredient(event) {
        event.preventDefault();
        onSave(ingredient);
    }

    function onCancel(event){
        event.preventDefault();
        props.onCancel();
    }

    return (<>
        <form>
            <div className="form-group row">
                <label htmlFor="name" className="col-sm-12 col-md-12 col-lg-3 col-form-label">Name:</label>
                <div className="col-sm-12 col-md-12 col-lg-9">
                    <input name="name" id="name" className="form-control pr-2" onChange={changeName}
                           value={ingredient.name}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="quantity" className="col-sm-12 col-md-12 col-lg-3 col-form-label">Quantity:</label>
                <div className="col-sm-12 col-md-12 col-lg-9">
                    <input name="quantity" id="quantity" type="number" step="0.01" className="form-control pr-2"
                           onChange={changeQuantity} value={ingredient.quantity}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="unit" className="col-sm-12 col-md-12 col-lg-3 col-form-label">Unit:</label>
                <div className="col-sm-12 col-md-12 col-lg-9">
                    <Select name="unit"
                            id="unit"
                            options={selectOptions}
                            onChange={changeUnit}
                            value={selectValue}
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <button className="btn btn-primary btn-block" onClick={saveIngredient}> Save Ingredient</button>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <button className="btn btn-primary btn-block" onClick={onCancel}> Cancel</button>
                </div>
            </div>
        </form>
    </>);
}

export default withRouter(IngredientForm);