/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favPage, setFavPage] = useState(1);
  const favPageSize = 8;

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteRecipes");
    if (storedFavorites) {
      setFavoriteRecipes(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const addFavorite = (recipe) => {
    setFavoriteRecipes((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === recipe.id)) {
        const updatedFavorites = [...prevFavorites, recipe];
        localStorage.setItem(
          "favoriteRecipes",
          JSON.stringify(updatedFavorites)
        );
        return updatedFavorites;
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (recipeId) => {
    setFavoriteRecipes((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (fav) => fav.id !== recipeId
      );
      localStorage.setItem("favoriteRecipes", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const favTotalPages = Math.ceil(favoriteRecipes.length / favPageSize);

  const displayedFavorites = favoriteRecipes.slice(
    (favPage - 1) * favPageSize,
    favPage * favPageSize
  );

  return (
    <FavoriteContext.Provider
      value={{
        favoriteRecipes,
        addFavorite,
        removeFavorite,
        favPage,
        setFavPage,
        favTotalPages,
        displayedFavorites,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
