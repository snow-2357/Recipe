/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favPage, setFavPage] = useState(1);
  const favPageSize = 8;

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
