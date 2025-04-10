import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import FormNewProduct from "./pages/FormNewProduct";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route
        path="/products/new"
        element={
          <ProtectedRoute>
            <FormNewProduct />
          </ProtectedRoute>
        }
      />
      <Route path="/orders" element={<Orders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
