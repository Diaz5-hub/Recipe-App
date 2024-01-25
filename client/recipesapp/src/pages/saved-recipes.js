import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID"; 

export const SavedRecipes = () =>{
    const[savedRecipes,setSavedRecipes] = useState([]);
    const userID = useGetUserID();
    
    //when enter on the home,page this function will be called
    useEffect(() => {
        //created a async function as we react does not let us declare async function above
        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            }catch(err){
                console.error(err);
            }
        };
        fetchSavedRecipe();
    },[]);
    return (
    <div>
        <h1>Saved Recipes</h1>
    <ul>
        {savedRecipes.map((recipe) => (
            <li key={recipe._id}>
                <div>
                    <h2>{recipe.name}</h2>
                </div>
                <div className="instructions">
                    <p> {recipe.instructions} </p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name}/>
                <p> Cooking Time: {recipe.cookingTime}(minutes)</p>
                <p>Culture:{recipe.culture}</p>
            </li>
        ))}
    </ul>
    </div>
    );
};