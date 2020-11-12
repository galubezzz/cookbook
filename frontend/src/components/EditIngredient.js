import React, {useEffect, useState} from 'react'
import axios from "axios";
import {withRouter} from 'react-router-dom';
import Select from 'react-select';

function EditIngredient(props){
    const unitUrl = "http://127.0.0.1:8000/api/v1/units/";
    const id = parseInt(props.id);
    const [ingredient, setIngredient] = useState({id: id, unit: null});
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    // (опции должны иметь формат {value: "значение", label: "подпись"} )
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectValue, setSelectValue] = useState({});
    const token = props.user.token;
    const getIngredientUrl = (id) => `http://127.0.0.1:8000/api/v1/ingredients/${id}/`

    useEffect(() => {
        axios.get(unitUrl).then((response) => {

            for (let unit in response.data) {
                setSelectOptions(selectOptions => selectOptions.concat({value: unit, label: response.data[unit]}))
            }
            console.log("---units", selectOptions)
        })
    }, []);

    useEffect(() => {

        axios.get(getIngredientUrl(id), {headers: {"Authorization": `Token ${token}`}}).then((response) => {
            setIngredient(
                {
                    id: response.data['id'],
                    quantity: response.data['quantity'],
                    unit: response.data['unit'],
                    name: response.data['name'],
                }
            )
            setSelectValue({value: response.data['unit']})
        })
    }, [])

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

        console.log(selectedOption);

        setIngredient({
            ...ingredient,
            unit: selectedOption.value,
        });

        setSelectValue(selectedOption);
    }

    function saveIngredient(event) {
        event.preventDefault();
        axios.patch(getIngredientUrl(id), ingredient, { headers: {"Authorization" : `Token ${token}`} }).then((response) => {
            console.log('--response', response);
            if (response.status === 200) {
                setSaved(true);
                props.onSave();
                // props.history.push(`/recipe/${response.data.recipe}`)
            } else {
                alert(response)
                setMessage(`was not saved: ${JSON.stringify(response)}`);
            }
        }).catch((error => {
            for (let _ in error) {
                console.log('-----error property', _, error[_]);
            }
            console.log('----message', error.response.data)
        }))

    }


    return (
        <>
            {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
            <p>
                {message}
            </p>
            <form>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-1 col-form-label">Name:</label>
                    <div className="col-sm-8">
                        <input name="name" id="name" className="form-control pr-2"
                               onChange={changeName}
                               value={ingredient.name}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="quantity" className="col-sm-1 col-form-label">Quantity:</label>
                    <div className="col-sm-8">
                        <input name="quantity" id="quantity"
                               type="number"
                               step="0.01"
                               className="form-control pr-2"
                               value={ingredient.quantity}
                               onChange={changeQuantity}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="unit" className="col-sm-1 col-form-label">Unit:</label>
                    <div className="col-sm-8">
                        <Select name="unit"
                                id="unit"
                                options={selectOptions}
                                onChange={changeUnit}
                                value={selectOptions.filter(option => option.value === selectValue.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-9">
                        <button className="btn btn-primary btn-block" onClick={saveIngredient}> Save Ingredient</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default withRouter(EditIngredient)