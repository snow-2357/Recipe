/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useMemo } from "react";
import useGetData from "../Hooks/useGetData";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const apiKey = import.meta.env.VITE_SPOOACULAR_KEY;

  const [url, setUrl] = useState(
    `https://api.spoonacular.com/recipes111/complexSearch`
  );

  const params = useMemo(
    () => ({
      number: 8,
      offset: (page - 1) * 9,
      apiKey: apiKey,
    }),
    [page, apiKey]
  );

  const { data, loading, error } = useGetData(url, params);

  useEffect(() => {
    if (data) {
      setRecipes(data.results || []);
    }
  }, [data]);

  return (
    <RecipeContext.Provider
      value={{ recipes, error, loading, page, setPage, setUrl }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
