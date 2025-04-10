import { useState } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router";
import apiCall from "../utils/apiCall";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      login(response.token);
      setStatus(null);
      navigate("/");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">
          Prijava
        </h2>

        {["username", "password"].map((field) => (
          <div key={field} className="mb-4">
            <label
              htmlFor={field}
              className="block font-medium mb-1 capitalize"
            >
              {field}
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              id={field}
              value={data[field]}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Nemaš nalog?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registruj se
          </Link>
        </p>

        {status && <p className="text-red-600 text-center mt-4">{status}</p>}
      </form>
    </div>
  );
};

export default Login;
