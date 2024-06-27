import { useState } from "react";

export default function RecipeCard({ data }) {
  const [saved, setSaved] = useState(false);
  const [servings, setServings] = useState(1);

  const handleSave = () => {
    setSaved(!saved);
  };

  const increaseServings = () => {
    setServings(servings + 1);
  };

  const decreaseServings = () => {
    if (servings > 1) {
      setServings(servings - 1);
    }
  };

  return (
    <>
      <div className="rounded-md shadow-md ">
        <div
          className="flex items-end justify-end h-56 w-full bg-cover cursor-pointer"
          style={{
            backgroundImage:
              "url(https://cdn.britannica.com/53/157453-050-2D17B555/Ice-cubes-heat-temperature-rises-melting-ice.jpg)",
          }}
        >
          <button
            onClick={handleSave}
            className={`p-2 rounded-sm m-2 ${
              saved ? "bg-green-500" : "bg-gray-500"
            } text-white`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
        <div className="px-5 py-3">
          <h3 className="text-gray-700 capitalize font-semibold">
            {data.title}
          </h3>
          {/*  */}
          <div className="flex items-center mt-2">
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
    </>
  );
}
