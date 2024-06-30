/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../Utils/FavoriteContext";
import { FaRegHeart, FaHeart } from "react-icons/fa";
//

export default function RecipeCard({ data, onClick }) {
  const { favoriteRecipes, addFavorite, removeFavorite } =
    useContext(FavoriteContext);
  const [saved, setSaved] = useState(false);

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

  const handleClick = (e) => {
    if (e.target.name !== "save" && e.target.name !== "count") {
      onClick(data);
    }
  };

  return (
    <div onClick={handleClick} className="rounded-md shadow-md cursor-pointer">
      <div
        className="flex items-end justify-end h-56 w-full bg-cover relative"
        style={{
          backgroundImage: `url(${data.image})`,
        }}
      >
        <button
          name="save"
          onClick={handleSave}
          className={`p-2 rounded-lg m-2 absolute top-0 right-0
            bg-white
           text-white`}
        >
          {saved ? (
            <FaHeart className="text-red-500 h-6 w-6" />
          ) : (
            <FaRegHeart
              className=" h-6 w-6"
              style={{ stroke: "black", strokeWidth: "4" }}
            />
          )}
        </button>
      </div>
      <div className="px-5 py-3">
        <h3 className="text-gray-700 capitalize font-semibold line-clamp-1">
          {data.title}
        </h3>
      </div>
    </div>
  );
}
