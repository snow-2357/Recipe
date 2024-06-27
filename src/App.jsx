import "./App.css";
import RecipeList from "./components/RecipeList";
import { RecipeProvider } from "./Hooks/ContextWrapper";
import { TabProvider } from "./Hooks/TabContext";

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
