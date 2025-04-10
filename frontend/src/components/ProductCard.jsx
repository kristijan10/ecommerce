import { useEffect, useState } from "react";
import { useCart } from "../context/cart";

const ProductCard = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (status) {
      const timeout = setTimeout(() => setStatus(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleAddToCart = () => {
    addToCart(data, quantity);
    setStatus("Dodato u korpu");
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col gap-3 w-full max-w-xs">
      <img
        src={data.imageUrl}
        alt={data.name}
        className="w-full rounded object-cover h-40"
      />
      <div>
        <h4 className="text-lg font-semibold text-black">{data.name}</h4>
        <p className="text-sm text-gray-600">{data.desc}</p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-blue-600 font-bold">{data.price} RSD</span>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, +e.target.value))}
          className="w-16 border rounded px-2 py-1 text-center text-black"
        />
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          Kupi
        </button>
      </div>
      {status && <p className="text-green-600 text-sm">{status}</p>}
    </div>
  );
};

export default ProductCard;
