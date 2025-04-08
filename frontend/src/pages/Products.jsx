import { Link } from "react-router";
import { useEffect, useState } from "react";

const Products = () => {
  const [data, setData] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      <p>products</p>
      <Link to="/">home</Link>
      <br />
    </>
  );
};

export default Products;
