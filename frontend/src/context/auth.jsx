import { createContext, useContext, useEffect, useState } from "react";
// import apiCall from "./apiCall";
import { useNavigate } from "react-router";
import apiCall from "../utils/apiCall";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(true);
    fetchUser();
  };

  const logout = () => {
    setUser(null);
    setToken(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchUser = async () => {
    try {
      const userData = await apiCall("/auth/me", {
        method: "GET",
      });
      setUser(userData);
    } catch (error) {
      console.log(error);
      logout();
    }
  };

  useEffect(() => {
    if (!user && token) fetchUser();
    else if (!user && !token) navigate("/login");
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
