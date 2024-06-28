import "./App.css";
import RecipeList from "./components/RecipeList";
import { RecipeProvider } from "./Utils/RecipeContext";
import { TabProvider } from "./Utils/TabContext";
function App() {
  return (
    <>
      <TabProvider>
        <RecipeProvider>
          <RecipeList />
        </RecipeProvider>
      </TabProvider>
    </>
  );
}

export default App;
