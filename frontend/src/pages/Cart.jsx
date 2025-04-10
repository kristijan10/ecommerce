import { Link } from "react-router";
import { useCart } from "../context/cart";

const Cart = () => {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-md mx-auto bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Korpa
        </h1>

        {items.length ? (
          <div className="flex flex-col gap-4">
            {items.map(({ item, quantity, amount }) => (
              <div key={item.id} className="border-b pb-2">
                <p className="font-semibold">{item.name}</p>
                <p>Količina: {quantity}</p>
                <p className="text-blue-600 font-medium">
                  Ukupno: {amount} RSD
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Korpa je prazna</p>
        )}

        <Link
          to="/"
          className="mt-6 block bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default Cart;
