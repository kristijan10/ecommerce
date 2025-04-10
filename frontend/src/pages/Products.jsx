import { Link } from "react-router";
import { useEffect, useState } from "react";
import apiCall from "../utils/apiCall";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const products = await apiCall("/products", { method: "GET" });
        setData(products);
      } catch (error) {
        setError(error);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="text-2xl capitalize">products</h1>
      <div className="flex gap-5">
        {data && data.map((d) => <ProductCard data={d} key={d.id} />)}
      </div>
      {error && <p>{error}</p>}
      <Link to="/">home</Link>
      <br />
    </>
  );
};

export default Products;
