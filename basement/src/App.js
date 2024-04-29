import { BrowserRouter as Router } from "react-router-dom";
import AppNavigation from "./Navigation";
import AdminContextProvider from "./store/AdminContext";

function App() {
  return (
    <>
      <AdminContextProvider>
        <Router>
          <AppNavigation/>
        </Router>
      </AdminContextProvider>
    </>
  );
}

export default App;
