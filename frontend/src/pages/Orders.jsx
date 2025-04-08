import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";
import { Link } from "react-router";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const orders = await apiCall("/orders", { method: "GET" });

        setOrders(orders);
      } catch (error) {
        setError(error);
      }
    }

    fetchOrders();
  }, []);
  return (
    <>
      <h1>Orders</h1>
      {orders &&
        orders.map((o) => (
          <div key={o.id}>
            <div className="flex gap-2">
              <span>{o.id}</span>
              <span>{o.user_id}</span>
              <span>{o.status}</span>
              <span>{o.createdAt}</span>
            </div>
          </div>
        ))}
      {error && <p>{error}</p>}
      <Link to="/">Home</Link>
    </>
  );
};

export default Orders;
