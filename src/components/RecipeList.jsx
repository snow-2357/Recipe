import { useContext, useState } from "react";
import NavBar from "./NavBar";
import RecipeCard from "./RecipeCard";
import RecipePopup from "./RecipeDetails";
import { RecipeContext } from "../Utils/RecipeContext";
import { TabContext } from "../Utils/TabContext";
import { FavoriteContext } from "../Utils/FavoriteContext";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

const RecipeList = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { currentTab } = useContext(TabContext);
  const { favoriteRecipes, displayedFavorites } = useContext(FavoriteContext);

  const { recipes, recipesTotal, error, loadingState } =
    useContext(RecipeContext);

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipe(recipeId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRecipe(null);
  };

  const tabs = ["Home", "Favorite"];

  const displayedRecipes = currentTab === "Home" ? recipes : displayedFavorites;
  console.log(displayedRecipes, "apple");

  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <NavBar tabs={tabs} />
          {/* search */}
          <SearchBar />
        </div>
      </header>
      <main className="my-8">
        <div className="container mx-auto px-6">
          <h3 className="text-gray-700 text-2xl font-medium">
            {currentTab === "Home" ? "Recipes" : "Favorite Recipes"}
          </h3>
          <span className="mt-3 text-sm text-gray-500">
            {currentTab === "Home"
              ? `${recipesTotal} Recipes`
              : `${favoriteRecipes.length} Recipes`}
          </span>
          <>
            {loadingState ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">
                Something went wrong
              </div>
            ) : (
              <>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                  {displayedRecipes.map((item) => (
                    <RecipeCard
                      key={item.id}
                      data={item}
                      onClick={() => handleRecipeClick(item.id)}
                    />
                  ))}
                </div>
                {isPopupOpen && selectedRecipe && (
                  <RecipePopup recipeId={selectedRecipe} onClose={closePopup} />
                )}
              </>
            )}
          </>
          {/* Pagination */}
          <Pagination />
        </div>
      </main>
    </div>
  );
};

export default RecipeList;
