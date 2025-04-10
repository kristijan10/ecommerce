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
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border">id</th>
              <th className="px-4 py-2 text-left border">user_id</th>
              <th className="px-4 py-2 text-left border">status</th>
              <th className="px-4 py-2 text-left border">createdAt</th>
              {user?.isAdmin && (
                <th className="px-4 py-2 text-left border">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-2 border">{o.id}</td>
                <td className="px-4 py-2 border">{o.user_id}</td>
                <td className="px-4 py-2 border">
                  {editId === o.id ? (
                    <select
                      className="border rounded px-2 py-1"
                      defaultValue={o.status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="paid">paid</option>
                      <option value="pending">pending</option>
                    </select>
                  ) : (
                    o.status
                  )}
                </td>
                <td className="px-4 py-2 border">{o.createdAt}</td>
                {user?.isAdmin && (
                  <td className="px-4 py-2 border">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() =>
                        editId === o.id ? handleSave(o.id) : setEditId(o.id)
                      }
                    >
                      {editId === o.id ? "Save" : "Edit"}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <p className="text-red-600 mt-4">{error.toString()}</p>}
      <Link className="inline-block mt-4 text-blue-500 hover:underline" to="/">
        Home
      </Link>
    </>
  );
};

export default Orders;
