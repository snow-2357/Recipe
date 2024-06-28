import { useContext, useState } from "react";
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
//
export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { handleSearch, setUrl } = useContext(RecipeContext);
  const [searchOption, setSearchOption] = useState(0); // 0 means default

  const handleSubmit = (e) => {
    e.preventDefault();
    //
    console.log(searchQuery, searchOption);
    if (searchQuery.trim()) {
      if (searchOption === 0) {
        setUrl("https://api.spoonacular.com/recipes/complexSearch");
        handleSearch(searchQuery, 0);
      } else if (searchOption === 1) {
        setUrl("https://api.spoonacular.com/recipes/findByIngredients");
        handleSearch(searchQuery, 1);
      } else if (searchOption === 2) {
        setUrl("https://api.spoonacular.com/recipes/complexSearch");
        handleSearch(searchQuery, 2);
      }
    }
  };

  const handleCheck = (e) => {
    const { name } = e.target;

    if (name === "ingredient") {
      setSearchOption(searchOption === 1 ? 0 : 1);
    } else if (name === "cuisine") {
      setSearchOption(searchOption === 2 ? 0 : 2);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center mt-6 max-w-lg mx-auto relative"
      >
        <div className="flex-grow relative">
          <SearchIcon className="absolute left-3 top-3 text-gray-400" />
          <input
            className="w-full bg-white border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search by keyword"
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
      <div className="my-4 flex gap-4 justify-center items-center">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-blue-500"
            name="cuisine"
            checked={searchOption === 2}
            onChange={handleCheck}
          />
          <span className="ml-2">Cuisine</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-blue-500"
            name="ingredient"
            checked={searchOption === 1}
            onChange={handleCheck}
          />
          <span className="ml-2">Ingredient</span>
        </label>
      </div>
    </>
  );
}
