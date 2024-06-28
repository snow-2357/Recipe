/* eslint-disable react/prop-types */
import { useEffect, useMemo } from "react";
import useGetData from "../Hooks/useGetData";

export default function RecipePopup({ recipeId, onClose }) {
  const url = useMemo(
    () => `https://api.spoonacular.com/recipes/${recipeId}/information`,
    [recipeId]
  );

  const { data: recipeDetails, loading, error } = useGetData(url);

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch recipe details:", error);
    }
  }, [error]);

  // Note: this api dont have nutritional  values

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg relative max-w-3xl mx-auto border border-gray-300 overflow-y-auto max-h-full">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
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
              <div className="w-1/2 pr-4">
                <img
                  src={recipeDetails.image}
                  alt={recipeDetails.title}
                  className="h-64 object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold mt-4">
                  {recipeDetails.title}
                </h3>
                <p className="mt-2 text-gray-600 line-clamp-4">
                  {recipeDetails.summary.replace(/<[^>]+>/g, "")}
                </p>
              </div>
              <div className="w-1/2 pl-4 border-l border-gray-300">
                <h4 className="text-lg font-semibold mb-2">Ingredients</h4>
                <ul className="list-disc list-inside text-left">
                  {recipeDetails.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.amount} {ingredient.unit}{" "}
                      <span className="font-semibold">{ingredient.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Instructions</h4>
              <ol className="list-decimal list-inside text-left">
                {recipeDetails.instructions
                  .replace(/<[^>]+>/g, "")
                  .split(". ")
                  .map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
              </ol>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
