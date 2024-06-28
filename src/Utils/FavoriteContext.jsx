/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const addFavorite = (recipe) => {
    setFavoriteRecipes((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === recipe.id)) {
        return [...prevFavorites, recipe];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (recipeId) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== recipeId)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteRecipes, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
