import React, {useState, useEffect} from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

function AddIngredients(props) {
    const ingredientUrl = "http://127.0.0.1:8000/api/v1/ingredients/";
    const unitUrl = "http://127.0.0.1:8000/api/v1/units/";
    const [ingredient, setIngredient] = useState([]);
    const [saved, setSaved] = useState(false);
    const [message, setMessage] = useState('');
    let selectOptions = []
    // (опции должны иметь формат {value: "значение", label: "подпись"} )
    //const [selectOptions, setSelectOptions] = useState([]);
    const id = props.match.params.id;

    useEffect(()=>{
        axios.get(unitUrl).then((response)=>{
            for (let unit in response.data){
                selectOptions.push({value: response.data[unit], label: unit});
            }
            console.log("---units", selectOptions)
        })
    }, []);

    function changeName(event){
        setIngredient({
            ...ingredient,
            name: event.target.value
    })
    }

    function changeQuantity(event){
        setIngredient({
            ...ingredient,
            quantity: event.target.value
    })
    }

    function changeUnit(selectedOption){
        setIngredient({
            ...ingredient,
            unit: selectedOption.value
    })
    }



    function saveIngredient() {

        setIngredient({
            ...ingredient,
            recipe: id
            }
        );
        console.log('--------id', ingredient.recipe);
        // const data = new FormData();
        // data.append('unit', ingredient.unit)
        // data.append('name', ingredient.name)
        // data.append('quantity', ingredient.quantity)
        // data.append('recipe', ingredient.recipe)
         axios.post(ingredientUrl, ingredient).then((response)=>{
            console.log('--response', response);
            if (response.status === 201) {
                setSaved(true);
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


    return(
        <div>

                {saved ? <h3 style={{color: 'green'}}>Successfully saved</h3> : null}
                    <p>
                        {message}
                    </p>
                <div className="form-group row">
                    <label htmlFor="name" className="col-sm-1 col-form-label">Name:</label>
                    <div className="col-sm-8">
                        <input name="name" id="name" className="form-control pr-2" onChange={changeName}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="quantity" className="col-sm-1 col-form-label">Quantity:</label>
                    <div className="col-sm-8">
                        <input name="quantity" id="quantity" type="number" step="0.01" className="form-control pr-2" onChange={changeQuantity}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="unit"  className="col-sm-1 col-form-label">Unit:</label>
                    <div className="col-sm-8">
                        <Select name="unit" id="unit" options={selectOptions} className="form-control pr-2" onChange={changeUnit}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-9">
                        <button className="btn btn-primary btn-block" onClick={saveIngredient}> Save Ingredient</button>
                    </div>
                </div>

        </div>
    )
}

export default withRouter(AddIngredients);