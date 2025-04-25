import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/LoginRegister";
import Navbar from "./components/Navbar/Navbar";
import { CartProvider } from "./provider/CartContext";
import { AuthProvider } from "./provider/AuthContext";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

const AppRoutes = () => {
  const location = useLocation(); // Access the current location in the app

  return (
    <>
      {/* Conditionally render Navbar based on the route */}
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        {/* Public Route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Routes requiring authentication */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
