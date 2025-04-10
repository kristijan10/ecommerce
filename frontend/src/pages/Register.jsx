import { useState } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router";
import apiCall from "../utils/apiCall";

// TODO: dodati funkcionalnost za prikaz lozinke i na Login formi

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [status, setStatus] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall("/auth/register", {
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
          Registracija
        </h2>

        {[
          { name: "username", type: "text" },
          { name: "email", type: "email" },
          { name: "password", type: "password" },
        ].map(({ name, type }) => (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block font-medium mb-1 capitalize">
              {name}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={data[name]}
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
          Register
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Imaš nalog?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Prijavi se
          </Link>
        </p>

        {status && <p className="text-red-600 text-center mt-4">{status}</p>}
      </form>
    </div>
  );
};

export default Register;
