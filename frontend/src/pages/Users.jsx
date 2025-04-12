import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";
import { Link } from "react-router";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiCall("/users", { method: "GET" });
        setUsers(response);
      } catch (error) {
        setStatus(error.message);
      }
    })();
  }, []);

  const handleRoleChange = (id) => {
    setUsers((old) =>
      old.map((u) => (u.id === id ? { ...u, isAdmin: !u.isAdmin } : u))
    );
  };

  const handleSave = async (id) => {
    const user = users.find((u) => u.id === id);

    try {
      const response = await apiCall(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ isAdmin: user.isAdmin }),
      });
      setStatus(response.message);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Korisnici
        </h1>

        {status && <p className="text-blue-600 text-center mb-4">{status}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Korisničko ime</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Admin</th>
                <th className="px-4 py-2 border">Akcija</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="px-4 py-2 border">{u.id}</td>
                  <td className="px-4 py-2 border">{u.username}</td>
                  <td className="px-4 py-2 border">{u.email}</td>
                  <td className="px-4 py-2 border text-center">
                    <input
                      type="checkbox"
                      checked={!!u.isAdmin}
                      onChange={() => handleRoleChange(u.id)}
                      className="w-5 h-5 accent-blue-600"
                    />
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleSave(u.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Sačuvaj
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

export default Users;
