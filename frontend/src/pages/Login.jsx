import { useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router";
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
      setStatus(response.message);

      login(response.token);
      navigate("/");
    } catch (error) {
      setStatus(error.message);
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {["username", "password"].map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field}: </label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              id={field}
              value={data[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit">Login</button>
      </form>

      {status && <p>{status}</p>}
    </>
  );
};

export default Login;
