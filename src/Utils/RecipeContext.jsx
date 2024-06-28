/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useMemo } from "react";
import useGetData from "../Hooks/useGetData";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [recipesTotal, setRecipeTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState(0); // 0 means default
  const apiKey = import.meta.env.VITE_SPOOACULAR_KEY;

  const [url, setUrl] = useState(
    `https://api.spoonacular.com/recipes11/complexSearch`
  );

  const params = useMemo(() => {
    let paramsObj = {
      number: 8,
      offset: (page - 1) * 9,
      apiKey: apiKey,
    };

    if (searchOption === 1) {
      paramsObj = {
        ...paramsObj,
        ingredients: searchQuery,
      };
    } else if (searchOption === 2) {
      paramsObj = {
        ...paramsObj,
        cuisine: searchQuery,
      };
    } else {
      paramsObj = {
        ...paramsObj,
        query: searchQuery,
      };
    }

    return paramsObj;
  }, [page, apiKey, searchQuery, searchOption]);

  const { data, loading, error } = useGetData(url, params);

  useEffect(() => {
    if (data) {
      setRecipes(Array.isArray(data) ? data : data.results || []);
      setRecipeTotal(data.totalResults || 0);
    }
  }, [data, searchOption]);

  const handleSearch = (query, type) => {
    setSearchQuery(query);
    setSearchOption(type);
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
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
