import { Link } from "react-router";
import { useCart } from "../context/cart";
import { useState } from "react";
import apiCall from "../utils/apiCall.js";
import { useAuth } from "../context/auth.jsx";

const Cart = () => {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [status, setStatus] = useState(null);

  const handlePay = async (e) => {
    e.preventDefault();

    try {
      const order_data = { user_id: user.id, status: "" };

      const order_items_data = items.map((p) => {
        return {
          product_id: p.item.id,
          amount: p.amount,
          quantity: p.quantity,
        };
      });

      const response = await apiCall("/orders", {
        method: "POST",
        body: JSON.stringify({ order_data, order_items_data }),
      });
      console.log(response);
      setStatus(response.message);
      clearCart();
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto bg-white text-black rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">Korpa</h1>

        {items.length ? (
          <div className="space-y-4">
            {items.map(({ item, quantity, amount }) => (
              <div
                key={item.id}
                className="border-b pb-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Količina: {quantity}</p>
                </div>
                <p className="text-blue-600 font-medium">{amount} RSD</p>
              </div>
            ))}

            <button
              onClick={handlePay}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              Plati
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Korpa je prazna</p>
        )}

        {status && (
          <p
            className={`text-center font-medium ${
              status.toLowerCase().includes("uspesno")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}

        <Link
          to="/"
          className="block text-center bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 rounded"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default Cart;
