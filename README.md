# Recipe Search Application

## Overview

This React application allows users to search for recipes using the **Spoonacular** API. It displays recipe details, including the image, ingredients, instructions, and nutritional information in a popup when a recipe is selected.

## Features

- **Search Recipes**: Users can search for recipes by keyword, also have search with ingredient and cuisine.
- **View Recipe Details**: Click on a recipe to view detailed information in a popup, also see the instruction to make each recipe and also get a idea how much ingredient we need for multiple items.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Installation

1. **Install dependencies**:

   ```sh
   npm install
   ```

2. **Create a `.env` file** with your Spoonacular API key:

   ```
   VITE_SPOOACULAR_KEY=your_api_key_here
   ```

3. **Start the application**:
   ```sh
   npm run dev
   ```

## Usage

1. **Search for Recipes**: Use the search bar to find recipes by keyword.
2. **View Recipe Details**: Click on any recipe from the search results to open a popup with detailed information.
3. **Close Popup**: Click the close button or anywhere outside the popup to close it.

## Components

- **`RecipeList`**: Lists all the recipes with pagination and includes a section to view favorite recipes.
- **`SearchBar`**: Handles the search functionality and displays search results.
- **`RecipePopup`**: Displays detailed information about the selected recipe.
- **`useGetData`**: Custom hook for fetching data from the Spoonacular API.
- **`RecipeContext`**:Context and functions to handle fetching, displaying, and searching recipes.
- **`FavoriteContext`**:Manages favorite recipes using local storage (up to 80 recipes).
- **`TabContext`**: Simple context to toggle between showing API-fetched recipes or saved favorite recipes.
