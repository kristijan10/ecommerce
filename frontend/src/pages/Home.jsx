import { Link } from "react-router";
import { useAuth } from "../context/auth";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <h1>Admin panel</h1>

      {user ? (
        <>
          <h2>Zdravo, {user.username}</h2>
          <Link to="/products">proizvodi</Link>
          <br />
          {user.isAdmin && (
            <>
              <Link to="/products/new">dodaj novi proizvod</Link>
              <br />
            </>
          )}
          <Link to="/orders">porudzbine</Link>
          <br />
          <Link to="/cart">korpa</Link>
          <br />
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Home;
