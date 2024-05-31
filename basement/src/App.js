import { BrowserRouter as Router } from "react-router-dom";
import AppNavigation from "./Navigation";
import AdminContextProvider from "./store/AdminContext";
import GamesContextProvider from "./store/GamesContext";
import LayoutContextProvider from "./store/LayoutContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AdminContextProvider>
        <LayoutContextProvider>
        <GamesContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
          <Router>
            <AppNavigation/>
          </Router>
        </GamesContextProvider>
        </LayoutContextProvider>
        </AdminContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;