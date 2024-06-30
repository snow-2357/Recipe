/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import useGetData from "../Hooks/useGetData";
import { IoMdClose } from "react-icons/io";

export default function RecipePopup({ recipeId, onClose }) {
  const url = useMemo(
    () => `https://api.spoonacular.com/recipes/${recipeId}/information`,
    [recipeId]
  );

  const [servings, setServings] = useState(1);

  const { data: recipeDetails, loading, error } = useGetData(url);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch recipe details:", error);
    }
  }, [error]);

  const increaseServings = (e) => {
    e.stopPropagation();
    setServings(servings + 1);
  };

  const decreaseServings = (e) => {
    e.stopPropagation();
    if (servings > 1) {
      setServings(servings - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 w-full">
      <div className="bg-white p-6 rounded-lg relative max-w-screen-xl mx-auto border border-gray-300 overflow-y-auto max-h-full">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          <IoMdClose className="w-6 h-7" />
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="text-red-500">
            <p>Failed to fetch recipe details: {error}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : recipeDetails ? (
          <div className="flex flex-col">
            <div className="w-full flex justify-between">
              <div className="w-full text-left pr-4">
                <img
                  src={recipeDetails.image}
                  alt={recipeDetails.title}
                  className="h-64 w-full object-cover rounded-lg"
                />
                <div className="flex flex-row">
                  <div>
                    <h3 className="text-2xl font-bold mt-4">
                      {recipeDetails.title}
                    </h3>
                    <p className="mt-2 text-gray-600 line-clamp-4">
                      {recipeDetails.summary.replace(/<[^>]+>/g, "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-4">
              <div className=" text-left">
                <h3 className="text-2xl font-bold my-4">Instructions</h3>
                <ol className="list-decimal list-inside text-left">
                  {recipeDetails.instructions
                    .replace(/<[^>]+>/g, "")
                    .split(". ")
                    .map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                </ol>
              </div>
              <div className="w-1/2 pl-4 border-l border-gray-300 text-left">
                <h3 className="text-2xl font-bold my-4">Ingredients</h3>

                <ul className="list-disc list-inside text-left">
                  {recipeDetails.extendedIngredients
                    .sort((a, b) => a.amount - b.amount)
                    .map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.amount * servings} {ingredient.unit}{" "}
                        <span className="font-semibold">{ingredient.name}</span>
                      </li>
                    ))}
                </ul>
                <div className="flex flex-row justify-start gap-4 items-center">
                  <h1 className="font-semibold ">Quantity:</h1>
                  <div name="count" className="flex items-center mt-2">
                    <button
                      onClick={decreaseServings}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-3">{servings}</span>
                    <button
                      onClick={increaseServings}
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
