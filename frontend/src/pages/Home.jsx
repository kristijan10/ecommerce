import { Link } from "react-router";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const Home = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();

  const handleLogout = () => {
    clearCart();
    logout();
  };

  if (!user) return <p className="text-center text-gray-500">Učitavanje...</p>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Admin Panel
        </h1>

        <h2 className="text-lg font-medium mb-4 text-center">
          Zdravo, <span className="text-blue-600">{user.username}</span>
        </h2>

        <nav className="flex flex-col gap-3 mb-6">
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
          >
            Proizvodi
          </Link>

          {user.isAdmin && (
            <Link
              to="/products/new"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
            >
              Dodaj proizvod
            </Link>
          )}

          <Link
            to="/orders"
            className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
          >
            Porudžbine
          </Link>

          <Link
            to="/cart"
            className="bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
          >
            Korpa
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full bg-black border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
