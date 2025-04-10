import { useState } from "react";
import { useCart } from "../context/cart";

const ProductCard = ({ data }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  return (
    <div className="border">
      <img src={data.imageUrl} className="w-full" />
      <div className="p-1">
        <h4>{data.name}</h4>
        <h5>{data.desc}</h5>
        <div className="flex flex-row justify-between">
          <h6 className="font-bold">{data.price}</h6>
          <input
            type="number"
            onChange={(e) => setQuantity(+e.target.value)}
            value={quantity}
            className="w-16 border px-1"
          />
          <button onClick={() => addToCart(data, quantity)}>Kupi</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
