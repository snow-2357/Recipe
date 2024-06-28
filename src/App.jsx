import "./App.css";
import RecipeList from "./components/RecipeList";
import { FavoriteContext } from "./Utils/FavoriteContext";
import { RecipeProvider } from "./Utils/RecipeContext";
import { TabProvider } from "./Utils/TabContext";
function App() {
  return (
    <>
      <TabProvider>
        <RecipeProvider>
          <FavoriteContext>
            <RecipeList />
          </FavoriteContext>
        </RecipeProvider>
      </TabProvider>
    </>
  );
}

export default App;
