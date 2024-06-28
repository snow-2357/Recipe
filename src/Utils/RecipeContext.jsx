import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const apiKey = import.meta.env.VITE_SPOOACULAR_KEY;

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.spoonacular.com/recipes/complexSearch`,
  //         {
  //           params: {
  //             apiKey: apiKey,
  //             number: 10,
  //             offset: (page - 1) * 10,
  //           },
  //         }
  //       );
  //       setRecipes(response.data.results);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchRecipes();
  // }, [page]);
  console.log(recipes, "data");

  return (
    <RecipeContext.Provider value={{ recipes, page, setPage }}>
      {children}
    </RecipeContext.Provider>
  );
};
