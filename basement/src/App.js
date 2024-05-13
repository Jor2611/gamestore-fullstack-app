import { BrowserRouter as Router } from "react-router-dom";
import AppNavigation from "./Navigation";
import AdminContextProvider from "./store/AdminContext";
import GamesContextProvider from "./store/GamesContext";
import LayoutContextProvider from "./store/LayoutContext";

function App() {
  return (
    <>
      <AdminContextProvider>
      <LayoutContextProvider>
      <GamesContextProvider>
        <Router>
          <AppNavigation/>
        </Router>
      </GamesContextProvider>
      </LayoutContextProvider>
      </AdminContextProvider>
    </>
  );
}

export default App;
