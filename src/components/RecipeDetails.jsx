export default function RecipePopup({ recipe, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg relative max-w-md mx-auto">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src="https://cdn.britannica.com/53/157453-050-2D17B555/Ice-cubes-heat-temperature-rises-melting-ice.jpg"
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h3 className="text-xl font-semibold mt-4">{recipe.title}</h3>
        <p className="mt-2 text-gray-600">{recipe.details}</p>
      </div>
    </div>
  );
}
