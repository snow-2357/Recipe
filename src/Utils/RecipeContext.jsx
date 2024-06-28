/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useMemo } from "react";
import useGetData from "../Hooks/useGetData";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [recipesTotal, setRecipeTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const apiKey = import.meta.env.VITE_SPOOACULAR_KEY;

  const [url, setUrl] = useState(
    `https://api.spoonacular.com/recipes/complexSearch`
  );

  const params = useMemo(
    () => ({
      number: 8,
      offset: (page - 1) * 9,
      apiKey: apiKey,
      query: searchQuery,
    }),
    [page, apiKey, searchQuery]
  );

  const { data, loading, error } = useGetData(url, params);

  useEffect(() => {
    if (data) {
      setRecipes(data.results || []);
      setRecipeTotal(data.totalResults || 0);
    }
  }, [data]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  // make clear action

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        recipesTotal,
        error,
        loading,
        page,
        setPage,
        setUrl,
        handleSearch,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
