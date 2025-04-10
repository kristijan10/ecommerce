import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  const addToCart = (data, quantity) => {
    setItems([
      ...items,
      { item: data, quantity, amount: data.price * quantity },
    ]);
  };

  const removeFromCart = () => {};

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
