import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        let apiUrl = `http://localhost:3001/recipes?search=${searchTerm}`;
        if (selectedCategory !== "All") {
          apiUrl += `&category=${selectedCategory}`;
        }
        const response = await axios.get(apiUrl);
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipe();
    if (cookies.access_token) fetchSavedRecipe();
  }, [searchTerm, selectedCategory, userID, cookies.access_token]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes && savedRecipes.includes(id);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can save the user's preference in local storage or cookies
    // and use it to maintain dark mode state on page refresh.
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <h1>Recipes</h1>
      <div className="controls">
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            {/* Add more categories as needed */}
          </select>
        </label>
        <label>
          Dark Mode:
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </label>
      </div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p> {recipe.instructions} </p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p> Cooking Time: {recipe.cookingTime}(minutes)</p>
            <p>Culture:{recipe.culture}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};