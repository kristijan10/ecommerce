import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/auth";
import { useEffect } from "react";

const Home = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  return (
    <>
      <h1>Admin panel</h1>
      {user?.isAdmin && (
        <>
          <h2>Zdravo, {user.username}</h2>
          <Link to="/products">proizvodi</Link>
          <br />
          <Link to="/products/new">dodaj novi proizvod</Link>
          <br />
          <Link to="/orders">porudzbine</Link>
          <br />
          <button onClick={logout}>Logout</button>
        </>
      )}{" "}
      {user && !user.isAdmin && (
        <>
          <h2>Zdravo, {user.username}</h2>
          <button onClick={logout}>Logout</button>
        </>
      )}
      {!user && <p>Loading...</p>}
    </>
  );
};

export default Home;
