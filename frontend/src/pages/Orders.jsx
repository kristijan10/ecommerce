import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";
import { Link } from "react-router";
import { useAuth } from "../context/auth";
import { orders } from "../../../backend/temp_data";

const Orders = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiCall("/orders", { method: "GET" });
        setData(res);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);

  const handleSave = (id) => {
    const order = orders.find((o) => o.id === id);
    order.status = status;
    setData(data.map((d) => (d.id === id ? { ...d, status } : d)));

    setEditId(null);
    setStatus(null);
  };

  return (
    <>
      <h1>Orders</h1>
      <div>
        {data?.map((o) => (
          <div key={o.id} className="flex gap-2 items-center">
            <span>{o.id}</span>
            <span>{o.user_id}</span>
            {editId === o.id ? (
              <select
                defaultValue={o.status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="paid">paid</option>
                <option value="pending">pending</option>
              </select>
            ) : (
              <span>{o.status}</span>
            )}
            <span>{o.createdAt}</span>
            {user?.isAdmin && (
              <button
                onClick={() =>
                  editId === o.id ? handleSave(o.id) : setEditId(o.id)
                }
              >
                {editId === o.id ? "Save" : "Edit"}
              </button>
            )}
          </div>
        ))}
      </div>
      {error && <p>{error.toString()}</p>}
      <Link to="/">Home</Link>
    </>
  );
};

export default Orders;
