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

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg relative max-w-2xl mx-auto border border-gray-300 flex">
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
          <>
            <div className="w-2/3 pr-4 h-2/3">
              <img
                src={recipeDetails.image}
                alt={recipeDetails.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-4">
                {recipeDetails.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {recipeDetails.summary.replace(/<[^>]+>/g, "")}
              </p>
            </div>
            <div className="w-1/3 pl-4 border-l border-gray-300">
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
          </>
        ) : null}
      </div>
    </div>
  );
}
