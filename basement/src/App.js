import { BrowserRouter as Router } from "react-router-dom";
import AppNavigation from "./Navigation";
import AlertContextProvider from "./store/AlertContext";
import AdminContextProvider from "./store/AdminContext";
import GamesContextProvider from "./store/GamesContext";
import LayoutContextProvider from "./store/LayoutContext";

function App() {
  return (
    <>
      <AlertContextProvider>
      <AdminContextProvider>
      <LayoutContextProvider>
      <GamesContextProvider>
        <Router>
          <AppNavigation/>
        </Router>
      </GamesContextProvider>
      </LayoutContextProvider>
      </AdminContextProvider>
      </AlertContextProvider>
    </>
  );
}

export default App;
