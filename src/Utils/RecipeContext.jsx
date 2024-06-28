/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useMemo } from "react";
import useGetData from "../Hooks/useGetData";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [recipesTotal, setRecipeTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [cuisineSearch, setCuisineSearch] = useState("");
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
      cuisine: cuisineSearch,
    }),
    [page, apiKey, searchQuery, cuisineSearch]
  );

  const { data, loading, error } = useGetData(url, params);

  useEffect(() => {
    if (data) {
      setRecipes(data.results || []);
      setRecipeTotal(data.totalResults || 0);
    }
  }, [data]);

  const handleSearch = (query) => {
    setCuisineSearch("");
    query;
    setPage(1);
  };
  const handleSearchCuisine = (query) => {
    setSearchQuery("");
    setCuisineSearch(query);

    setPage(1);
  };

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
        handleSearchCuisine,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
