import { Link } from "react-router";
import { useCart } from "../context/cart";

const Cart = () => {
  const { items } = useCart();

  return (
    <div>
      <h1>Korpa</h1>
      {items.length ? (
        items.map((i) => (
          <div key={i.item.id}>
            <p>{i.item.name}</p>
            <p>{i.quantity}</p>
            <p>{i.amount}</p>
          </div>
        ))
      ) : (
        <p>Korpa je prazna</p>
      )}

      <Link to="/">Home</Link>
    </div>
  );
};

export default Cart;
