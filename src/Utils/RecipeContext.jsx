import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const apiKey = import.meta.env.VITE_SPOOACULAR_KEY;
  const [loadingState, setLoading] = useState(false);
  const [error, setError] = useState(false); // we going to set this for all errors

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch`,
          {
            params: {
              // apiKey: apiKey,
              number: 8,
              offset: (page - 1) * 9,
            },
          }
        );
        setRecipes(response.data.results);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [page]);

  console.log(recipes, "data");

  return (
    <RecipeContext.Provider
      value={{ recipes, error, loadingState, page, setPage }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
