import { useState } from "react";
import NavBar from "./NavBar";
import RecipeCard from "./RecipeCard";
import RecipePopup from "./RecipeDetails";

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    details: "Details about Spaghetti Carbonara",
  },
  {
    id: 2,
    title: "Chicken Parmesan",
    details: "Details about Chicken Parmesan",
  },
  {
    id: 3,
    title: "Beef Stroganoff",
    details: "Details about Beef Stroganoff",
  },
  {
    id: 4,
    title: "Vegetable Stir Fry",
    details: "Details about Vegetable Stir Fry",
  },
  {
    id: 5,
    title: "Grilled Cheese Sandwich",
    details: "Details about Grilled Cheese Sandwich",
  },
  {
    id: 6,
    title: "Caesar Salad",
    details: "Details about Caesar Salad",
  },
  {
    id: 7,
    title: "Tacos",
    details: "Details about Tacos",
  },
  {
    id: 8,
    title: "Pancakes",
    image: "path/to/image8.jpg",
    details: "Details about Pancakes",
  },
  {
    id: 9,
    title: "Tomato Soup",
    details: "Details about Tomato Soup",
  },
  {
    id: 10,
    title: "BBQ Ribs",
    details: "Details about BBQ Ribs",
  },
];

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

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedRecipe(null);
  };
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
          <span className="mt-3 text-sm text-gray-500">20+ Recipes</span>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
            {recipes &&
              recipes.map((item) => (
                <RecipeCard
                  key={item.id}
                  data={item}
                  onClick={handleRecipeClick}
                />
              ))}
          </div>
        </div>
        {isPopupOpen && selectedRecipe && (
          <RecipePopup recipe={selectedRecipe} onClose={closePopup} />
        )}
      </main>
    </div>
  );
};

export default RecipeList;
