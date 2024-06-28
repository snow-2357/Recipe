/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../Utils/FavoriteContext";
//

export default function RecipeCard({ data, onClick }) {
  const { favoriteRecipes, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  const [saved, setSaved] = useState(false);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    setSaved(favoriteRecipes.some((fav) => fav.id === data.id));
  }, [favoriteRecipes, data.id]);

  const handleSave = (e) => {
    e.stopPropagation();
    if (saved) {
      removeFavorite(data.id);
    } else {
      addFavorite(data);
    }
    setSaved(!saved);
  };

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

  const handleClick = (e) => {
    if (e.target.name !== "save" && e.target.name !== "count") {
      onClick(data);
    }
  };

  return (
    <div onClick={handleClick} className="rounded-md shadow-md cursor-pointer">
      <div
        className="flex items-end justify-end h-56 w-full bg-cover"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      >
        <button
          name="save"
          onClick={handleSave}
          className={`p-2 rounded-sm m-2 ${
            saved ? "bg-green-500" : "bg-gray-500"
          } text-white`}
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <div className="px-5 py-3">
        <h3 className="text-gray-700 capitalize font-semibold line-clamp-1">
          {data.title}
        </h3>
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
  );
}
