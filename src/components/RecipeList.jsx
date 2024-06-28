import { useContext, useState } from "react";
import NavBar from "./NavBar";
import RecipeCard from "./RecipeCard";
import RecipePopup from "./RecipeDetails";
import { RecipeContext } from "../Utils/RecipeContext";

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
  const { recipes, error, loadingState, page, setPage } =
    useContext(RecipeContext);

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipe(recipeId);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRecipe(null);
  };

  const totalPages = 400;

  const tabs = ["Home", "Favorite"];

  return (
    <div className="bg-white">
      <header>
        <div className="container mx-auto px-6 py-3">
          <NavBar tabs={tabs} />
          <div className="relative mt-6 max-w-lg mx-auto">
            <SearchIcon />
            <input
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </header>
      <main className="my-8">
        <div className="container mx-auto px-6">
          <h3 className="text-gray-700 text-2xl font-medium">Recipes</h3>
          <span className="mt-3 text-sm text-gray-500">5000+ Recipes</span>
          {loadingState ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">Something went wrong</div>
          ) : (
            <>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {recipes.map((item) => (
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
          {/* Pagination */}
          <div className="flex justify-center mt-8 items-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="mx-1 px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline"
            >
              Prev
            </button>
            <span className="mx-2 text-gray-700">{`${page} / ${totalPages}`}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="mx-1 px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeList;
