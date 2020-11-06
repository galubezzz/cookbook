import React, {useState, useEffect} from "react";
import axios from 'axios'
import Recipe from "./Recipe";

export default function RecipeList(props) {
    const [recipes, setRecipes] = useState([]);
    const url = "http://127.0.0.1:8000/api/v1/recipes/";
    const token = props.user.token;
    useEffect(()=>{
        axios.get(url, { headers: {"Authorization" : `Token ${token}`} }).then((response)=>{
        console.log("it's mine", response.data);
        setRecipes(response.data);
        })
    }, []);

    function RenderRecipes(recipes) {
        return recipes.map((recipe)=>{
            return <Recipe recipe={recipe} key={recipe.id}/>
        })
    }
    return(
        <div>
            {recipes.length > 0 ? RenderRecipes(recipes) : "you don't have any recipes"}
        </div>
    )
}