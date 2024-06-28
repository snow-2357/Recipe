import { useContext } from "react";
import { TabContext } from "../Utils/TabContext";
import { RecipeContext } from "../Utils/RecipeContext";
import { FavoriteContext } from "../Utils/FavoriteContext";

export default function Pagination() {
  const { currentTab } = useContext(TabContext);
  const { page, setPage } = useContext(RecipeContext);
  const { favPage, setFavPage, favTotalPages } = useContext(FavoriteContext);
  const totalPages = 400;
  return (
    <div>
      <div className="flex justify-center mt-8 items-center">
        {currentTab === "Home" ? (
          <>
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
          </>
        ) : (
          <>
            {favTotalPages === 0 ? (
              <></>
            ) : (
              <>
                <button
                  onClick={() => setFavPage((prev) => Math.max(prev - 1, 1))}
                  className="mx-1 px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline"
                >
                  Prev
                </button>
                <span className="mx-2 text-gray-700">{`${favPage} / ${favTotalPages}`}</span>
                <button
                  onClick={() =>
                    setFavPage((prev) => Math.min(prev + 1, favTotalPages))
                  }
                  className="mx-1 px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:shadow-outline"
                >
                  Next
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
