import { createContext, useState, useEffect } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([
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
  ]);

  useEffect(() => {
    // we will fetch here
  }, []);

  return (
    <RecipeContext.Provider value={{ recipes }}>
      {children}
    </RecipeContext.Provider>
  );
};
