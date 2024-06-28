import { useContext, useState } from "react";
import NavBar from "./NavBar";
import RecipeCard from "./RecipeCard";
import RecipePopup from "./RecipeDetails";
import { RecipeContext } from "../Utils/RecipeContext";
import { TabContext } from "../Utils/TabContext";
import { FavoriteContext } from "../Utils/FavoriteContext";
import Pagination from "./Pagination";

const SearchIcon = () => (
  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
    <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const RecipeList = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentTab } = useContext(TabContext);
  const { favoriteRecipes, displayedFavorites } = useContext(FavoriteContext);

  const { recipes, error, loadingState, setUrl } = useContext(RecipeContext);

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipe(recipeId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRecipe(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // doing a onclick seach
    if (searchQuery.trim()) {
      console.log(searchQuery);
      // setUrl
    }
  };

  const tabs = ["Home", "Favorite"];

  const displayedRecipes = currentTab === "Home" ? recipes : displayedFavorites;

  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <NavBar tabs={tabs} />
          <form
            onSubmit={handleSubmit}
            className="flex items-center mt-6 max-w-lg mx-auto relative"
          >
            <div className="flex-grow relative">
              <SearchIcon className="absolute left-3 top-3 text-gray-400" />
              <input
                className="w-full bg-white border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </form>
        </div>
      </header>
      <main className="my-8">
        <div className="container mx-auto px-6">
          <h3 className="text-gray-700 text-2xl font-medium">
            {currentTab === "Home" ? "Recipes" : "Favorite Recipes"}
          </h3>
          <span className="mt-3 text-sm text-gray-500">
            {currentTab === "Home"
              ? "5000+ Recipes"
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
