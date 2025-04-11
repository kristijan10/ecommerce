import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";
import { Link } from "react-router";
import { useAuth } from "../context/auth";

const Orders = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
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
    // const order = orders.find((o) => o.id === id);
    // order.status = status;
    setData(data.map((d) => (d.id === id ? { ...d, status } : d)));
    setEditId(null);
    setStatus(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Porudžbine
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Korisnik</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Datum</th>
                {user?.isAdmin && <th className="px-4 py-2 border">Akcija</th>}
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
                        onClick={() =>
                          editId === o.id ? handleSave(o.id) : setEditId(o.id)
                        }
                        className="text-blue-600 hover:underline"
                      >
                        {editId === o.id ? "Sačuvaj" : "Izmeni"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {error && (
          <p className="text-red-600 mt-4 text-center">{error.toString()}</p>
        )}

        <Link
          to="/"
          className="mt-6 block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
};

export default Orders;
