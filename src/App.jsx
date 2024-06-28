import "./App.css";
import RecipeList from "./components/RecipeList";
import { FavoriteProvider } from "./Utils/FavoriteContext"; // Correct import
import { RecipeProvider } from "./Utils/RecipeContext";
import { TabProvider } from "./Utils/TabContext";

function App() {
  return (
    <>
      <TabProvider>
        <FavoriteProvider>
          <RecipeProvider>
            <RecipeList />
          </RecipeProvider>
        </FavoriteProvider>
      </TabProvider>
    </>
  );
}

export default App;
