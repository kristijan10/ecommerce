import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <>
      <h1>Page not found</h1>
      <Link to="/">Home</Link>
    </>
  );
};

export default PageNotFound;
